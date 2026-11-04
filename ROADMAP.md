# EditPic — Roadmap de Produto e Desenvolvimento

> **Produto:** EditPic  
> **Propósito:** importar, editar, padronizar e exportar imagens para sites, portfólios e redes sociais.  
> **Documento:** `ROADMAP.md`  
> **Estado:** planejamento vivo, sujeito a revisões conforme testes e aprendizado técnico.  
> **Última revisão:** 03/11/2026.  
> **Versão inicial de referência:** V0.1.0 (MVP implementado; homologação completa pendente).  
> **Links:** [Versão online](https://mateuscanjerana.github.io/EditPic/) · [GitHub](https://github.com/mateuscanjerana/EditPic)

---

## 1. Visão do produto

O **EditPic** começa como uma aplicação web para importar, redimensionar, enquadrar e exportar imagens. Sua visão de longo prazo é evoluir para um **estúdio de imagens para projetos digitais**, combinando:

1. **Padronização:** resoluções, proporções, recortes e formatos de saída.
2. **Composição:** ajuste de enquadramento, zoom, rotação e guias.
3. **Tratamento fotográfico:** exposição, contraste, cor e comparação antes/depois.
4. **Produtividade:** presets, histórico e processamento em lote.
5. **SVG Studio:** geração de artes vetoriais parametrizadas para cards de projetos e banners.
6. **Edição avançada:** remoção de fundo, máscaras, camadas e projetos editáveis.
7. **Extensão de background:** preenchimentos locais e, opcionalmente, expansão generativa.

### 1.1 Problema que queremos resolver

Imagens recebidas para sites e redes sociais nem sempre possuem a proporção, resolução ou composição desejadas. Padronizá-las costuma exigir várias ferramentas e configurações repetitivas. O EditPic pretende tornar esse fluxo **simples, rápido e consistente**, sem distorcer elementos ou esconder limitações de qualidade.

### 1.2 Princípios de produto

- **Simplicidade primeiro:** resolver o básico com confiabilidade antes de ampliar o editor.
- **Evolução incremental:** cada versão deve ser testável e entregar utilidade própria.
- **Fidelidade visual:** não deformar o conteúdo nem prometer detalhes que não existiam.
- **Original preservado:** transformações e exportações não devem sobrescrever o arquivo de origem.
- **Controle do usuário:** prévia, comparação, reversão e confirmação de operações externas.
- **Privacidade por padrão:** processamento no navegador sempre que viável.
- **Arquitetura modular:** separar interface, cálculos, renderização, exportação, SVG e integrações.
- **Qualidade antes de IA:** preferir métodos previsíveis quando eles resolvem o problema.
- **Licenças verificadas:** avaliar termos de bibliotecas, modelos e APIs antes de uso comercial.

---

## 2. Escopo geral e limites

| Área | Objetivo | Observação |
| --- | --- | --- |
| Importação | Ler JPG, PNG e WebP | Ampliar formatos somente se necessário |
| Proporções | 16:9, 9:16, 1:1, 4:5, 3:4 e original | Preservar geometria |
| Recorte | Automático e, futuramente, manual | Prévia fiel à exportação |
| Tratamento | Ajustar luminosidade e cores | Priorizar parâmetros reversíveis |
| Exportação | JPG, PNG e WebP; futuramente lote | Avisar sobre compressão e transparência |
| Presets | Reutilizar configurações por finalidade | Cards, posts e banners |
| SVG Studio | Criar artes vetoriais e padrões | Não é geração fotográfica com IA |
| Remoção de fundo | Segmentar e corrigir máscaras | Modelo/licença precisam ser avaliados |
| Extensão de fundo | Cor, espelho, desfoque e IA opcional | Modos locais funcionam sem API |
| Projetos | Camadas e arquivo reeditável | Exige esquema de dados versionado |

**Fora do escopo inicial:** editor RAW profissional, clone completo do Photoshop ou Illustrator, geração de fotos do zero por prompts, garantia de recuperação fiel de detalhes ausentes e sistema multiusuário.

---

## 3. Convenções deste roadmap

- **[x]** Implementado no protótipo de referência, mas não necessariamente homologado em todos os ambientes.
- **[ ]** Pendente, planejado ou ainda requer validação.
- **Status:** `Protótipo`, `Planejado`, `Em desenvolvimento`, `Em validação` ou `Concluído`.
- **Critério de aceite:** resultado observável necessário para considerar uma entrega pronta.
- **Dependência:** recurso ou versão anterior que precisa estar estável.
- **Versionamento:** `MAJOR.MINOR.PATCH`; mudanças apenas documentais não exigem nova versão funcional.

> **Nota sobre a V0.1.0:** há código funcional de upload, enquadramento e exportação, com seis testes automatizados dos cálculos de imagem. Existem testes iniciais de interface, mas a validação de ponta a ponta em diferentes arquivos, navegadores e dispositivos ainda precisa ser formalizada. Por isso, o status permanece **Protótipo em validação**.

---

## 4. Roadmap por versão

### V0.1.0 — MVP: importar, enquadrar e exportar

**Status:** Protótipo implementado; homologação pendente.  
**Objetivo:** converter imagens para proporções e formatos úteis sem backend nem API.

**Escopo implementado**

- [x] Interface web responsiva.
- [x] Upload por seleção ou arrastar-e-soltar de JPG, PNG e WebP.
- [x] Limite inicial de **15 MB por arquivo** e mensagens de erro básicas.
- [x] Pré-visualização do original e do resultado.
- [x] Presets **16:9, 9:16, 1:1, 4:5, 3:4** e proporção original.
- [x] Modo **Preencher**: recorte automático centralizado.
- [x] Modo **Encaixar**: imagem completa com cor de fundo configurável.
- [x] Exportação JPG, PNG e WebP, com qualidade configurável para JPG/WebP.
- [x] Limite de proteção para proporção original: **4096 px no maior lado e cerca de 8 milhões de pixels**.
- [x] Cálculos de recorte e encaixe separados da interface, com seis testes unitários.
- [ ] Validar imagens reais horizontais, verticais, transparentes e com nomes especiais.
- [ ] Testar arquivos acima do limite, inválidos e corrompidos.
- [ ] Conferir dimensões e abertura de cada formato exportado em navegadores relevantes.
- [ ] Revisar acessibilidade, teclado, toque e mensagens de erro.
- [ ] Registrar resultados de validação e conferir tag/release no GitHub.

**Critérios de aceite**

1. Importar imagens válidas dos três formatos e exibir ambas as prévias.
2. Alternar entre 16:9 e 9:16 e exportar as dimensões indicadas.
3. Comparar **Preencher** e **Encaixar** sem distorção geométrica.
4. Exportar JPG, PNG e WebP que abram corretamente.
5. Informar falhas de entrada de forma clara.
6. Executar `node --test tests/*.test.cjs` com sucesso e registrar os testes manuais.

**Dependências:** HTML, CSS, JavaScript, Canvas API. Não exige npm no MVP.

### V0.2.0 — Recorte manual e enquadramento

**Status:** Planejado.  
**Objetivo:** permitir escolher a região exata da imagem que será mantida.

- [ ] Arrastar a imagem com mouse ou toque.
- [ ] Controlar zoom respeitando limites do enquadramento.
- [ ] Recentralizar e restaurar o recorte.
- [ ] Exibir guias opcionais, incluindo regra dos terços.
- [ ] Manter a proporção escolhida; avaliar recorte livre.
- [ ] Não incluir guias ou alças no arquivo exportado.
- [ ] Testar coordenadas, bordas e correspondência entre prévia e saída.

**Critérios de aceite:** enquadrar manualmente uma imagem 4:3 em 16:9, movimentar e ampliar sem distorção; exportar exatamente a área prevista usando mouse e toque.

**Dependência:** V0.1.0 validada.

### V0.3.0 — Tratamento fotográfico básico

**Status:** Planejado.  
**Objetivo:** permitir correções simples antes de exportar, sem comprometer o original.

- [ ] Adicionar brilho/exposição aproximada, contraste e saturação.
- [ ] Avaliar temperatura de cor e balanço de branco simplificados.
- [ ] Exibir comparação antes/depois.
- [ ] Restaurar cada ajuste e todos os ajustes.
- [ ] Não reaplicar filtros sobre pixels já processados sucessivamente.
- [ ] Manter coerência entre prévia e exportação.

**Critérios de aceite:** aplicar, desfazer e reaplicar três ajustes; restaurar a imagem original; exportar resultado coerente com a prévia.

**Dependências:** renderização estável e recorte da V0.2.0.

### V0.4.0 — Histórico de alterações e presets

**Status:** Planejado.  
**Objetivo:** reduzir trabalho repetitivo e permitir configurações reutilizáveis.

- [ ] Implementar desfazer/refazer para as operações principais.
- [ ] Guardar estados reversíveis de recorte, ajuste e exportação.
- [ ] Criar presets para cards 16:9, posts 1:1 e conteúdos 9:16.
- [ ] Salvar, renomear, aplicar e excluir presets locais.
- [ ] Restaurar configurações padrão.
- [ ] Definir esquema de persistência e plano de migração.

**Critérios de aceite:** desfazer e refazer ajustes de recorte/cor; salvar preset, atualizar a página e aplicá-lo novamente sem alterar o original.

**Dependências:** V0.2.0–V0.3.0.

### V0.5.0 — SVG Studio: gerador de artes vetoriais

**Status:** Planejado.  
**Objetivo:** gerar **artes leves, escaláveis e personalizáveis** para cards do portfólio, banners e outras interfaces.

- [ ] Gerar em **16:9**, **1:1** e dimensões personalizadas, com `viewBox` correto.
- [ ] Criar **cinco templates**: geométrico, tecnologia/circuitos, camadas, ondas e gradientes com padrões.
- [ ] Editar paletas, intensidade, opacidade, escala, posição e densidade dos elementos.
- [ ] Oferecer preset escuro com detalhes laranja e outras identidades visuais.
- [ ] Permitir ícone, título ou sigla opcional; permitir também exportar **sem texto**.
- [ ] Exibir prévia responsiva e gerar variações determinísticas por `seed`.
- [ ] Exportar SVG válido com `width`, `height` e `viewBox` definidos.
- [ ] Salvar parâmetros em JSON para reconstruir a arte depois.
- [ ] Processar localmente, sem cadastro ou API generativa.
- [ ] Validar textos e impedir incorporação arbitrária de código HTML/SVG não confiável.

**Critérios de aceite**

1. Produzir cinco artes visualmente distintas a partir dos templates.
2. Exportar SVG que abre no navegador e mantém nitidez ao ampliar.
3. Gerar card 16:9 com paleta, elementos e ícone opcional.
4. Reproduzir uma composição com mesmo template, parâmetros e `seed`.
5. Suportar textos especiais com escapamento seguro e opção sem textos.
6. Testar no desktop e no celular e documentar as licenças utilizadas.

**Tecnologias candidatas:** SVG nativo, [SVG.js](https://svgjs.dev/), [Lucide](https://lucide.dev/), [Tabler Icons](https://tabler.io/icons) e [GeoPattern](https://github.com/btmills/geopattern). A integração depende de prova de conceito e revisão de licença.

**Dependências:** painel de parâmetros e presets da V0.4.0.

### V0.6.0 — Processamento em lote

**Status:** Planejado.  
**Objetivo:** padronizar várias imagens com as mesmas configurações.

- [ ] Importar múltiplos arquivos, exibindo status por item.
- [ ] Aplicar preset a todo o lote.
- [ ] Processar com concorrência limitada para controlar memória.
- [ ] Definir nomes de saída previsíveis e evitar colisões.
- [ ] Gerar um ZIP com arquivos concluídos.
- [ ] Isolar falhas, permitir cancelamento e liberar recursos temporários.

**Critérios de aceite:** exportar lote representativo com dimensões corretas e arquivos íntegros; reportar falhas sem perder o lote inteiro.

**Dependências:** exportação e presets estabilizados; avaliar biblioteca ZIP e licença.

### V0.7.0 — Remoção de fundo e refinamento de máscaras

**Status:** Planejado.  
**Objetivo:** isolar o assunto principal e corrigir falhas da segmentação.

- [ ] Avaliar modelo de segmentação executado no navegador e sua licença.
- [ ] Exibir fundo transparente com grade de prévia.
- [ ] Comparar original e versão sem fundo.
- [ ] Adicionar pincéis de remover/restaurar a máscara.
- [ ] Ajustar bordas e reduzir halos quando viável.
- [ ] Exportar PNG ou WebP com transparência compatível.
- [ ] Informar download do modelo, progresso, falhas e limitações do dispositivo.

**Critérios de aceite:** gerar canal alfa, refinar uma região da máscara e exportar corretamente sem alterar o original.

**Dependências:** sistema de estado e exportação estáveis; estudo de desempenho, licença e privacidade.

### V0.8.0 — Extensor de background

**Status:** Planejado.  
**Objetivo:** adaptar proporções sem precisar cortar o assunto principal.

- [ ] Preencher regiões novas por cor/amostragem das bordas.
- [ ] Implementar extensão por espelhamento.
- [ ] Implementar extensão por desfoque da própria imagem.
- [ ] Reposicionar e dimensionar a imagem original sobre o fundo estendido.
- [ ] Pré-visualizar e exportar formatos como 16:9 e 9:16.
- [ ] Avaliar **outpainting** apenas como opção futura, se custo, termos e resultados forem adequados.
- [ ] Informar alterações sintéticas e exigir consentimento para processamento remoto.

**Critérios de aceite:** transformar fotografia vertical em composição 16:9 com os métodos locais, sem distorção, sem chave de API e com exportação correta.

**Dependências:** recorte manual e pipeline confiável de renderização/exportação.

### V0.9.0 — Edição não destrutiva e camadas

**Status:** Planejado.  
**Objetivo:** salvar composições editáveis, preservando imagens e parâmetros.

- [ ] Definir modelo de projeto versionado para origem, ajustes, máscaras e camadas.
- [ ] Implementar ordem e visibilidade das camadas básicas.
- [ ] Manter recortes, filtros e máscaras como operações reversíveis quando possível.
- [ ] Salvar e reabrir projeto local com recursos necessários.
- [ ] Integrar histórico de ações e composição exportada.
- [ ] Planejar migração de arquivos de projeto entre versões.

**Critérios de aceite:** criar projeto com imagem, ajuste e máscara/camada; salvar, reabrir, editar e exportar sem perder o estado editável.

**Dependências:** histórico V0.4.0, máscaras V0.7.0 e composição estável.

### V0.10.0 — Revisão técnica e estabilização

**Status:** Planejado.  
**Objetivo:** consolidar segurança, usabilidade e qualidade antes da V1.0.0.

- [ ] Refatorar módulos com acoplamento excessivo.
- [ ] Revisar desempenho, memória e descarte de recursos.
- [ ] Expandir testes unitários, de integração, regressão visual e ponta a ponta.
- [ ] Testar navegadores e dispositivos relevantes.
- [ ] Revisar acessibilidade e feedback de operações.
- [ ] Atualizar documentação e mensagens de erro.
- [ ] Auditar licenças de bibliotecas/modelos realmente adotados.

**Critérios de aceite:** nenhuma falha bloqueadora conhecida nos fluxos principais; testes definidos aprovados; documentação e comportamento alinhados.

**Dependências:** integração das versões anteriores.

### V1.0.0 — Primeira versão estável

**Status:** Visão futura; lançamento condicionado à validação.  
**Objetivo:** disponibilizar uma aplicação confiável para criar e preparar imagens destinadas a projetos digitais.

- [ ] Homologar os módulos incluídos no lançamento.
- [ ] Corrigir bugs críticos de importação, renderização, exportação e recuperação.
- [ ] Registrar limitações e compatibilidade de navegadores.
- [ ] Publicar tag, release, changelog e instruções de uso.
- [ ] Garantir que o núcleo do editor funcione sem serviços de IA pagos.

**Critérios de aceite:** fluxo principal completo, resultados reproduzíveis, testes de regressão aprovados e limitações conhecidas documentadas.

**Dependência:** V0.10.0 validada.

### Após V1.0.0 — Pesquisa (não comprometida)

- [ ] Editor vetorial livre com curvas Bézier e manipulação de nós.
- [ ] Kits de imagens e ícones por identidade visual/projeto.
- [ ] Exportação automática de conjuntos responsivos e variações para redes sociais.
- [ ] Histogramas, curvas e gerenciamento de cor mais avançados.
- [ ] Super-resolução especializada ou restauração, se resultados e custos justificarem.
- [ ] Compartilhamento de presets entre membros de equipe.
- [ ] Assistência por texto para **configurar templates**, sem geração de fotografias do zero.

---

## 5. Arquitetura de referência

A estrutura abaixo representa uma **arquitetura futura**, não a organização já implementada por completo na V0.1.0.

```text
EditPic
├── Aplicação Web
│   ├── Upload e pré-visualização
│   ├── Recorte e tratamento
│   ├── Presets e histórico
│   ├── SVG Studio
│   └── Exportação
├── Núcleo de imagens
│   ├── Geometria e transformações
│   ├── Renderização e filtros
│   ├── Máscaras e camadas
│   ├── Modelo de projeto
│   └── Gerenciamento de memória
├── Serviços locais
│   ├── Validação de arquivos
│   ├── Exportação de formatos
│   ├── Lotes e ZIP
│   └── Salvamento local
└── Integrações opcionais
    ├── Modelos locais de segmentação
    ├── Expansão remota, se adotada
    └── Consentimento e segurança
```

### 5.1 Modelo de dados: requisito transversal

- A imagem original deve permanecer disponível e não ser sobrescrita silenciosamente.
- Recortes, filtros, camadas e máscaras deverão guardar parâmetros reversíveis quando viável.
- Arquivos de projeto devem conter **versão de esquema**, para futuras migrações.
- PNG/JPG/WebP exportados são resultados finais, não substitutos do projeto editável.
- Presets armazenam configurações, não necessariamente cópias da imagem.
- SVG Studio guarda **template + parâmetros + seed**, independentemente do SVG exportado.
- Armazenamento local deve prever quota, backup, recuperação e falhas.

### 5.2 Tecnologias candidatas (sujeitas a prova de conceito)

| Responsabilidade | Candidatas | Observações |
| --- | --- | --- |
| Interface | HTML, CSS, JavaScript; Vite se necessário | Evitar complexidade prematura |
| Renderização e recorte | Canvas API, OffscreenCanvas | Validar coordenadas e desempenho |
| Camadas e objetos | Fabric.js ou solução própria | Adotar conforme requisitos reais |
| Processamento de pixels | Canvas, Web Workers, OpenCV.js | Evitar dependências sem benefício demonstrado |
| SVG Studio | SVG nativo e SVG.js | Templates seguros e parametrizados |
| Ícones | Lucide e Tabler Icons | Revisar licença e avisos obrigatórios |
| Padrões | GeoPattern ou algoritmo próprio | Preferir resultados reproduzíveis |
| Processamento em lote | Biblioteca ZIP a definir | Controlar memória e formatos |
| Persistência | localStorage, IndexedDB, arquivos de projeto | Considerar limites e migração |
| Remoção de fundo | Modelo local de segmentação a avaliar | Desempenho e licença determinantes |
| Backend futuro | Node.js e Sharp | Apenas quando necessário |
| Extensão com IA | API/modelo opcional | Consentimento, custo e segurança |

**Regra de decisão:** incorporar uma biblioteca somente após revisar qualidade, integração, manutenção, licença, segurança e desempenho.

---

## 6. Dependências e ordem crítica

```text
Validação V0.1.0
      ↓
Recorte manual V0.2.0
      ↓
Tratamento básico V0.3.0
      ↓
Histórico e presets V0.4.0
      ├─────────→ SVG Studio V0.5.0
      └─────────→ Lote V0.6.0
                       ↓
              Removedor V0.7.0
                       ↓
              Extensor V0.8.0
                       ↓
              Camadas V0.9.0
                       ↓
              Revisão V0.10.0
                       ↓
              Estável V1.0.0
```

**Observação:** SVG Studio e processamento em lote podem avançar parcialmente em paralelo depois da estabilização dos presets. Nenhuma entrega pode quebrar o fluxo já publicado.

---

## 7. Qualidade, segurança e critérios de evolução

### 7.1 Testes essenciais

- [ ] Testar geometria de recorte, encaixe, zoom e limites (expandir os seis testes iniciais).
- [ ] Validar entrada de JPG, PNG e WebP em orientações e dimensões variadas.
- [ ] Testar arquivos acima do limite, inválidos ou corrompidos.
- [ ] Comparar a prévia com o resultado efetivamente exportado.
- [ ] Conferir formatos, dimensões, qualidade e transparência.
- [ ] Testar mouse/toque e teclado onde aplicável.
- [ ] Validar histórico, presets, salvamento e recuperação.
- [ ] Testar lotes, ZIP e liberação de memória.
- [ ] Testar SVG com caracteres especiais e entradas não confiáveis.
- [ ] Avaliar responsividade, acessibilidade e regressão visual.

### 7.2 Segurança e privacidade

- [ ] Validar tipo real, tamanho, dimensões e decodificação dos arquivos.
- [ ] Definir limites de Canvas e prevenir alocações excessivas de memória.
- [ ] Liberar URLs temporárias, buffers e objetos não utilizados.
- [ ] Produzir SVG apenas com elementos e atributos permitidos; escapar textos.
- [ ] Revisar licenças e origem de bibliotecas, ícones e modelos.
- [ ] Exigir consentimento explícito antes de qualquer processamento remoto.
- [ ] Proteger chaves de API exclusivamente em backend, caso ele seja introduzido.
- [ ] Definir retenção e descarte de arquivos caso haja processamento em servidor.

### 7.3 Métricas de produto

| Métrica | Pergunta de avaliação |
| --- | --- |
| Importação | Arquivos válidos carregam sem falhas? |
| Fidelidade | Proporções corretas, sem deformações? |
| Exportação | O arquivo gerado corresponde à prévia? |
| Desempenho | O processamento responde bem em dispositivos reais? |
| Memória | Há vazamentos ou travamentos com imagens grandes? |
| Máscaras | Contornos são corrigíveis sem destruir a origem? |
| SVG | Mesmos template, parâmetros e seed produzem a mesma arte? |
| Privacidade | O usuário é avisado quando algo sai do navegador? |
| Acessibilidade | As funções principais operam via teclado e toque? |
| Regressões | Versões novas preservam recursos anteriores? |

---

## 8. Riscos e mitigação

| Risco | Impacto | Estratégia |
| --- | --- | --- |
| Recorte remove o assunto | Alto | Prévia, recorte manual e modo encaixar |
| Redimensionamento reduz nitidez | Médio | Informar limitações e não prometer detalhes novos |
| Compressão degrada imagem/transparência | Médio/alto | Diferenciar formatos e testar exportação |
| Arquivos grandes travam navegador | Alto | Limites, medição e liberação de memória |
| Prévia difere do arquivo final | Alto | Pipeline compartilhado e testes de regressão |
| Histórico consome memória | Alto | Armazenar parâmetros e limitar cópias completas |
| Removedor produz halos e falhas | Médio/alto | Pincéis de máscara e comparação |
| Dependência tem licença restritiva | Alto | Auditoria antes da integração e comercialização |
| SVG executa código não confiável | Alto | Templates seguros, escapamento e validação |
| API consome créditos ou expõe fotos | Alto | Opt-in, proteção da chave e limites de uso |
| Escopo excessivo atrasa MVP | Alto | Entregas pequenas e critérios de aceite |

---

## 9. Backlog e priorização

### P0 — Bloqueadores da próxima fase

- [ ] Homologar V0.1.0 com imagens de teste reais.
- [ ] Corrigir erros de upload/exportação e validar a versão publicada.
- [ ] Confirmar coerência entre código, README, CHANGELOG e tag de release.
- [ ] Criar issues para os bugs reproduzíveis.

### P1 — Próxima entrega funcional

- [ ] Projetar recorte manual com mouse/toque.
- [ ] Implementar arrasto, zoom, centralização e guias.
- [ ] Testar limites e exportação fiel ao recorte.
- [ ] Registrar V0.2.0 com documentação, testes e pull request.

### P2 — Evolução de produto

- [ ] Tratamento fotográfico e antes/depois.
- [ ] Histórico e presets.
- [ ] SVG Studio com cinco templates seguros.
- [ ] Exportação em lote com ZIP.

### P3 — Pesquisa avançada

- [ ] Segmentação local e máscaras.
- [ ] Extensão de fundo por métodos locais.
- [ ] Outpainting remoto opcional com avaliação de custos.
- [ ] Edição não destrutiva com camadas e projetos editáveis.

---

## 10. Próximos passos recomendados

1. **Validar V0.1.0:** registrar resultados dos testes de upload, proporções, transparência e exportação.
2. **Organizar as issues:** um item por defeito ou funcionalidade, com critérios de aceitação.
3. **Desenvolver V0.2.0 em branch:** recorte manual e zoom, sem modificar funcionalidades já estáveis.
4. **Executar regressão:** comparar exportações e testar mouse/toque.
5. **Abrir pull request:** revisar código, testes e `CHANGELOG.md` antes do merge.
6. **Criar tag e release:** somente após a validação da versão.
7. **Seguir dependências:** tratamento, presets, SVG Studio e lote antes dos módulos mais complexos.

---

## 11. Registro de decisões

| Decisão | Justificativa |
| --- | --- |
| **EditPic** é o nome do projeto | Identidade unificada do editor |
| Reiniciar pela V0.1.0 | Histórico de Git compreensível e aprendizado gradual |
| Um único código-fonte no repositório | Tags e commits preservam versões anteriores |
| Pacotes nomeados `V0.2.0.zip`, `V0.3.0.zip` etc. | Facilitar organização fora do Git |
| Priorizar HTML/CSS/JS e Canvas | MVP simples e compatível com GitHub Pages |
| Processamento local por padrão | Privacidade e baixo custo |
| Descartar geração de fotos do zero por IA | Foco em edição e padronização do conteúdo enviado |
| SVG Studio planejado para V0.5.0 | Criação de cards vetoriais sem API generativa |
| Extensão local antes de IA remota | Previsibilidade, gratuidade e controle |
| IA externa somente opcional | Controlar custo, privacidade e disponibilidade |
| Edição não destrutiva como evolução | Preservar a origem e permitir revisões |
| Não fixar datas para versões futuras | Planejar por dependências e critérios de aceite |

---

## 12. Como manter o roadmap

Ao concluir uma versão:

1. Atualizar o **status** e marcar `[x]` apenas nos itens implementados e verificados.
2. Registrar resultados de testes, limitações conhecidas e bugs relevantes.
3. Atualizar `README.md` e `CHANGELOG.md` de acordo com as funções realmente disponíveis.
4. Registrar a tag/release no GitHub, com referência a issues e pull requests.
5. Repriorizar funcionalidades conforme desempenho, feedback e complexidade real.
6. Não considerar um recurso concluído apenas porque seu botão aparece na interface.

**Foco atual:** homologar a **V0.1.0** e, depois, começar a **V0.2.0 — Recorte manual**. O SVG Studio e os módulos avançados continuam previstos, mas a qualidade do editor começa com a confiabilidade das operações básicas.
