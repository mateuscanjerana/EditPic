# Roadmap do EditPic

> Documento de planejamento. Funcionalidades futuras não estão implementadas no MVP v0.1.0.
> Atualização de planejamento (31/10/2026): adicionado o módulo **SVG Studio**. Como nenhuma das versões a partir da v0.5.0 foi lançada, elas foram reorganizadas sem alterar a v0.1.0 já entregue.

## Visão do produto

O EditPic é um editor de imagens para sites, portfólios e redes sociais. Combina padronização, edição, exportação e, futuramente, recursos opcionais de IA. O módulo SVG Studio permitirá criar artes vetoriais para cards de projetos sem depender de geração de imagens com IA.

## Fase 1 — Base confiável

- [x] **v0.1.0 · MVP:** importar, proporções, prévia, recorte automático, encaixe, exportar e testar.
- [ ] **v0.2.0 · Recorte manual:** arrastar imagem, zoom, reposicionamento, guias e reset de enquadramento.
- [ ] **v0.3.0 · Tratamento básico:** brilho, contraste, saturação, exposição e comparação antes/depois.
- [ ] **v0.4.0 · Histórico e presets:** desfazer/refazer, configurações salvas e exportação padronizada.

## Fase 2 — Criação visual e produtividade

- [ ] **v0.5.0 · SVG Studio — gerador de artes para cards:** criar e personalizar banners vetoriais em modelos predefinidos, com prévia e exportação `.svg`; ver especificação abaixo.
- [ ] **v0.6.0 · Processamento em lote:** várias imagens, presets e download ZIP.
- [ ] **v0.7.0 · Removedor de fundo:** segmentação com biblioteca e licença compatíveis com o uso escolhido, além de refinamento manual de máscara.
- [ ] **v0.8.0 · Extensor de fundo:** inicialmente preenchimentos locais gratuitos (cor, espelho e desfoque); depois IA opcional, conforme custos e termos do serviço.

## Fase 3 — Evolução e estabilidade

- [ ] **v0.9.0 · Edição não destrutiva:** camadas, máscaras e arquivo de projeto editável.
- [ ] **v0.10.0 · Revisão técnica:** acessibilidade, desempenho, tratamento de erros, documentação e testes abrangentes.
- [ ] **v1.0.0 · Primeira versão estável:** lançamento condicionado à validação do fluxo completo de uso.

---

## Especificação planejada — SVG Studio (v0.5.0)

### Problema que resolve

Criar artes coesas, leves, escaláveis e personalizáveis para as imagens dos **cards de projetos do portfólio** e outras seções de sites, sem precisar recorrer a geradores por IA ou desenhar cada card manualmente.

### MVP do módulo

- [ ] Escolher tamanho/proporção do SVG: **16:9** (padrão para cards), **1:1** e dimensões personalizadas, respeitando `viewBox`.
- [ ] Selecionar entre **cinco templates**: abstrato geométrico; tecnologia/circuitos; formas em camadas; linhas/ondas; gradiente com padrões.
- [ ] Configurar cores de fundo e destaque, intensidade de brilho, opacidade, escala, posicionamento e densidade das formas.
- [ ] Aplicar **presets** de paleta, inclusive um tema escuro com realces em laranja para cards de projetos de tecnologia.
- [ ] Opcionalmente inserir um título, sigla ou ícone, com posicionamento ajustável; permitir gerar a arte **sem textos**.
- [ ] Exibir prévia responsiva em tempo real e regenerar variações alterando uma `seed`, com opção de manter resultados reproduzíveis.
- [ ] Exportar **SVG válido e vetorial** com `width`, `height` e `viewBox` definidos; guardar a configuração da arte em JSON, para reeditá-la depois.
- [ ] Criar as artes inteiramente no navegador, sem login, banco de dados ou API paga.

### Bibliotecas públicas candidatas (licenças a conferir novamente na integração)

| Biblioteca | Papel | Licença observada em out/2026 |
|---|---|---|
| [SVG.js](https://svgjs.dev/) / [`@svgdotjs/svg.js`](https://github.com/svgdotjs/svg.js) | Composição de formas, gradientes, transformações e exportação de SVG | MIT |
| [Lucide](https://lucide.dev/) | Ícones para tecnologia e projetos | ISC; exige preservar aviso de licença |
| [Tabler Icons](https://tabler.io/icons) | Alternativa com ícones SVG | MIT; exige preservar aviso de licença |
| [GeoPattern](https://github.com/btmills/geopattern) | Padrões geométricos determinísticos opcionais | MIT |

**Decisão técnica inicial:** priorizar SVG nativo (`<svg>`, `<rect>`, `<path>`, `<linearGradient>`, etc.) para templates simples; avaliar SVG.js quando houver manipulação interativa mais complexa. Não adicionar bibliotecas desnecessárias ao MVP v0.1.0.

### Arquitetura sugerida (quando o módulo começar)

- `src/svg-studio/templates/`: funções puras que criam composições por template e parâmetros.
- `src/svg-studio/presets.js`: cores, proporções e estilos reutilizáveis.
- `src/svg-studio/render.js`: exibição da prévia SVG de forma controlada.
- `src/svg-studio/export.js`: serialização, validação e download `.svg`.
- `tests/svg-studio.test.*`: testes de composição, dimensões, exportação e entrada de texto.

### Critérios de aceitação da v0.5.0

1. Criar pelo menos cinco artes visualmente distintas a partir dos templates sem precisar de imagens externas.
2. Exportar arquivo `.svg` que abre no navegador e continua nítido em qualquer resolução.
3. Criar arte em 16:9 com fundo, elementos decorativos e ícone opcional, adequada para card do portfólio.
4. Reproduzir a mesma arte ao reutilizar template, parâmetros e `seed`.
5. Gerar arte sem letras/logotipos e, quando solicitado, incluir título sem executar marcação HTML/SVG arbitrária.
6. Não requisitar chave de API, não depender de backend e não incorporar recursos remotos sem necessidade.
7. Validar carregamento e exportação em desktop e celular; documentar licenças das dependências realmente utilizadas.

### Ideias para versões posteriores (não incluídas na v0.5.0)

- Editor vetorial livre: camadas, curvas Bézier e manipulação de nós.
- Biblioteca compartilhável de templates de marca/portfólio.
- Exportação alternativa para PNG/WebP e pacotes de assets por projeto.
- Geração assistida por texto **para selecionar templates e parâmetros**, sem pedir a uma IA para devolver código SVG arbitrário.

### Segurança

Os SVGs são documentos XML e podem conter conteúdo ativo. O gerador deve criar elementos e atributos permitidos por código, tratar qualquer texto do usuário como texto (não HTML) e evitar incorporar SVG/HTML não confiável diretamente no DOM. Exportações com conteúdo externo ou templates de terceiros exigem validação/sanitização, além de revisão das licenças.

---

## Critérios para considerar a v0.1.0 concluída

- [ ] Importar uma imagem JPG real sem erros.
- [ ] Alternar entre 16:9 e 9:16.
- [ ] Comparar `Preencher` e `Encaixar` sem deformar elementos.
- [ ] Baixar WebP e verificar as dimensões.
- [ ] Baixar JPG e PNG.
- [ ] Rodar testes `node --test tests/*.test.cjs`.
- [ ] Criar repositório e enviar a tag `v0.1.0`.
- [ ] Habilitar GitHub Pages e testar o endereço público.

> A próxima versão só começa depois que os itens desta lista forem conferidos pelo desenvolvedor. Alterações apenas no roadmap podem ser registradas como commits de documentação, sem criar uma nova versão do aplicativo.
