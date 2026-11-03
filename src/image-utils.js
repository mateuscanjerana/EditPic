/* EditPic: funções matemáticas independentes da interface. */
(function (root) {
  "use strict";

  const PRESETS = Object.freeze({
    "16:9": { width: 1920, height: 1080 },
    "9:16": { width: 1080, height: 1920 },
    "1:1": { width: 1080, height: 1080 },
    "4:5": { width: 1080, height: 1350 },
    "3:4": { width: 1080, height: 1440 }
  });

  function validDimensions(width, height) {
    if (![width, height].every(n => Number.isFinite(n) && n > 0)) {
      throw new RangeError("As dimensões devem ser positivas.");
    }
  }

  function getOutputSize(preset, sourceWidth, sourceHeight) {
    if (Object.hasOwn(PRESETS, preset)) return { ...PRESETS[preset] };
    if (preset !== "original") throw new Error("Proporção desconhecida.");
    validDimensions(sourceWidth, sourceHeight);
    // Protege a memória ao exportar fotos muito grandes.
    const scale = Math.min(1, 4096 / Math.max(sourceWidth, sourceHeight),
      Math.sqrt(8_000_000 / (sourceWidth * sourceHeight)));
    return { width: Math.max(1, Math.round(sourceWidth * scale)),
      height: Math.max(1, Math.round(sourceHeight * scale)) };
  }

  function cropRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
    validDimensions(sourceWidth, sourceHeight);
    validDimensions(targetWidth, targetHeight);
    const sourceRatio = sourceWidth / sourceHeight;
    const targetRatio = targetWidth / targetHeight;
    if (sourceRatio > targetRatio) {
      const width = sourceHeight * targetRatio;
      return { x: (sourceWidth - width) / 2, y: 0, width, height: sourceHeight };
    }
    const height = sourceWidth / targetRatio;
    return { x: 0, y: (sourceHeight - height) / 2, width: sourceWidth, height };
  }

  function containRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
    validDimensions(sourceWidth, sourceHeight);
    validDimensions(targetWidth, targetHeight);
    const scale = Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight);
    const width = sourceWidth * scale;
    const height = sourceHeight * scale;
    return { x: (targetWidth - width) / 2, y: (targetHeight - height) / 2, width, height };
  }

  const api = Object.freeze({ PRESETS, getOutputSize, cropRect, containRect });
  root.EditPicImageUtils = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
