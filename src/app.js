/* EditPic v0.1.0 — lógica da aplicação (sem API e sem bibliotecas). */
(() => {
  "use strict";
  const math = window.EditPicImageUtils;
  const get = id => document.getElementById(id);
  const ui = {
    file: get("file-input"), dropzone: get("dropzone"), fileInfo: get("file-info"),
    fileName: get("file-name"), fileDetails: get("file-details"),
    ratio: get("ratio"), mode: get("mode"), modeHelp: get("mode-help"),
    background: get("background"), backgroundValue: get("background-value"),
    format: get("format"), quality: get("quality"), qualityValue: get("quality-value"),
    qualityHint: get("quality-hint"), canvas: get("canvas"), download: get("download"),
    reset: get("reset"), original: get("original-image"), originalEmpty: get("original-empty"),
    resultEmpty: get("result-empty"), originalTag: get("original-tag"), resultTag: get("result-tag"),
    outputSize: get("output-size"), status: get("status")
  };
  const ctx = ui.canvas.getContext("2d");
  const MAX_BYTES = 15 * 1024 * 1024;
  const MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
  const DEFAULTS = { ratio: "16:9", mode: "crop", background: "#101725", format: "image/webp", quality: "85" };
  let image = null;
  let sourceFile = null;
  let importNumber = 0;

  function status(message, tone = "default") {
    ui.status.textContent = message;
    ui.status.dataset.tone = tone;
  }

  function readableBytes(bytes) {
    return bytes < 1048576 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1048576).toFixed(1)} MB`;
  }

  async function importImage(file) {
    if (!file) return;
    if (!MIME.has(file.type)) return status("Formato não suportado. Use JPG, PNG ou WebP.", "error");
    if (file.size > MAX_BYTES) return status("A imagem supera 15 MB. Escolha um arquivo menor.", "error");
    const current = ++importNumber;
    const url = URL.createObjectURL(file);
    const candidate = new Image();
    status("Carregando imagem…");
    try {
      await new Promise((resolve, reject) => {
        candidate.onload = resolve;
        candidate.onerror = () => reject(new Error("Não foi possível decodificar a imagem."));
        candidate.src = url;
      });
      if (current !== importNumber) return;
      if (!candidate.naturalWidth || !candidate.naturalHeight) throw new Error("Imagem sem dimensões válidas.");
      image = candidate;
      sourceFile = file;
      // O objeto Image já mantém o conteúdo decodificado, mesmo após revogar a URL.
      ui.original.src = url;
      ui.original.hidden = false;
      ui.originalEmpty.hidden = true;
      ui.resultEmpty.hidden = true;
      ui.canvas.hidden = false;
      ui.fileInfo.hidden = false;
      ui.fileName.textContent = file.name;
      ui.fileDetails.textContent = `${candidate.naturalWidth} × ${candidate.naturalHeight} px · ${readableBytes(file.size)}`;
      ui.originalTag.textContent = `${candidate.naturalWidth} × ${candidate.naturalHeight}`;
      ui.download.disabled = false;
      ui.reset.disabled = false;
      drawPreview();
      status("Imagem carregada! Ajuste as opções e baixe o resultado.", "success");
    } catch (error) {
      if (current === importNumber) status(error.message || "Falha ao carregar imagem.", "error");
    } finally {
      // Aguarda o elemento <img> adotar os pixels antes de liberar a URL temporária.
      if (current !== importNumber) URL.revokeObjectURL(url);
      else if (image === candidate) setTimeout(() => URL.revokeObjectURL(url), 1000);
      else URL.revokeObjectURL(url);
    }
  }

  function updateForm() {
    const contain = ui.mode.value === "contain";
    ui.background.disabled = !contain;
    ui.backgroundValue.textContent = ui.background.value.toUpperCase();
    ui.modeHelp.textContent = contain
      ? "Mostra a imagem inteira e preenche as margens com a cor escolhida."
      : "Preenche o quadro e recorta o excesso nas bordas, sem distorcer.";
    const png = ui.format.value === "image/png";
    ui.quality.disabled = png;
    ui.qualityValue.textContent = png ? "Sem perdas" : `${ui.quality.value}%`;
    ui.resultTag.textContent = ui.ratio.value === "original" ? "Original" : ui.ratio.value;
    if (image) {
      const size = math.getOutputSize(ui.ratio.value, image.naturalWidth, image.naturalHeight);
      ui.outputSize.textContent = `${size.width} × ${size.height} px`;
    } else if (ui.ratio.value === "original") {
      ui.outputSize.textContent = "Proporção original";
    } else {
      const size = math.PRESETS[ui.ratio.value];
      ui.outputSize.textContent = `${size.width} × ${size.height} px`;
    }
  }

  function drawPreview() {
    updateForm();
    if (!image) return;
    const { width, height } = math.getOutputSize(ui.ratio.value, image.naturalWidth, image.naturalHeight);
    ui.canvas.width = width;
    ui.canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (ui.mode.value === "contain") {
      ctx.fillStyle = ui.background.value;
      ctx.fillRect(0, 0, width, height);
      const r = math.containRect(image.naturalWidth, image.naturalHeight, width, height);
      ctx.drawImage(image, r.x, r.y, r.width, r.height);
    } else {
      const r = math.cropRect(image.naturalWidth, image.naturalHeight, width, height);
      ctx.drawImage(image, r.x, r.y, r.width, r.height, 0, 0, width, height);
    }
  }

  function resetOptions() {
    ui.ratio.value = DEFAULTS.ratio;
    ui.mode.value = DEFAULTS.mode;
    ui.background.value = DEFAULTS.background;
    ui.format.value = DEFAULTS.format;
    ui.quality.value = DEFAULTS.quality;
    drawPreview();
    status("Configurações restauradas. A imagem original foi preservada.", "success");
  }

  function saveImage() {
    if (!image || !sourceFile) return;
    ui.download.disabled = true;
    status("Preparando arquivo…");
    const requestedMime = ui.format.value;
    ui.canvas.toBlob(blob => {
      ui.download.disabled = false;
      if (!blob) return status("O navegador não conseguiu exportar esta imagem.", "error");
      // Alguns navegadores retornam PNG quando um formato não está disponível.
      const extension = blob.type === "image/png" ? "png" : blob.type === "image/jpeg" ? "jpg" : "webp";
      const basename = sourceFile.name.replace(/\.[^.]+$/, "").replace(/[^\p{L}\p{N}_-]+/gu, "-").slice(0, 70) || "imagem";
      const name = `${basename}-${ui.canvas.width}x${ui.canvas.height}.${extension}`;
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = name;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 10_000);
      status(`Arquivo gerado: ${name} (${readableBytes(blob.size)}).`, "success");
    }, requestedMime, Number(ui.quality.value) / 100);
  }

  ui.file.addEventListener("change", () => {
    const file = ui.file.files?.[0];
    ui.file.value = ""; // permite selecionar o mesmo arquivo novamente
    importImage(file);
  });
  for (const event of ["dragenter", "dragover"]) {
    ui.dropzone.addEventListener(event, e => { e.preventDefault(); ui.dropzone.classList.add("dragging"); });
  }
  for (const event of ["dragleave", "drop"]) {
    ui.dropzone.addEventListener(event, e => { e.preventDefault(); ui.dropzone.classList.remove("dragging"); });
  }
  ui.dropzone.addEventListener("drop", e => importImage(e.dataTransfer?.files?.[0]));
  for (const control of [ui.ratio, ui.mode, ui.background, ui.format, ui.quality]) {
    control.addEventListener("input", drawPreview);
    control.addEventListener("change", drawPreview);
  }
  ui.download.addEventListener("click", saveImage);
  ui.reset.addEventListener("click", resetOptions);
  updateForm();
})();
