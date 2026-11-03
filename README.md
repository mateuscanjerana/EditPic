# EditPic

### Editor e padronizador de imagens para projetos web

**[Acessar versão online](https://mateuscanjerana.github.io/EditPic/)** | **[Repositório GitHub](https://github.com/mateuscanjerana/EditPic)**

O **EditPic** é uma aplicação web desenvolvida para facilitar o processamento, a edição e a padronização de imagens utilizadas em sites, portfólios, redes sociais e outros projetos digitais.

O projeto nasceu da necessidade de transformar imagens de diferentes resoluções e proporções em arquivos padronizados, de maneira simples, rápida e acessível.

Seu desenvolvimento é incremental, partindo de um MVP construído com **HTML, CSS e JavaScript**, com a proposta de evoluir gradualmente para um editor mais completo, incluindo ferramentas de tratamento fotográfico, edição vetorial e recursos opcionais de inteligência artificial.

**Versão atual:** `v0.1.0` — MVP

**Status:** Em desenvolvimento

---

## Experimente o EditPic

A aplicação está publicada gratuitamente pelo GitHub Pages.

**Versão online:** https://mateuscanjerana.github.io/EditPic/

Acesse o editor diretamente pelo navegador, sem necessidade de instalar programas ou configurar um ambiente de desenvolvimento.

---

## Objetivos

- Automatizar a padronização de imagens para projetos web.
- Facilitar operações de redimensionamento, recorte e exportação.
- Reduzir a necessidade de utilizar múltiplas ferramentas externas.
- Oferecer uma interface simples, intuitiva e responsiva.
- Desenvolver gradualmente recursos avançados de processamento de imagens.

O EditPic também é um projeto de aprendizagem prática em desenvolvimento frontend, computação gráfica, arquitetura de software, testes e versionamento.

## Funcionalidades disponíveis

### V0.1.0 — MVP

| Funcionalidade | Descrição |
|---|---|
| Upload | Importação de JPG, PNG e WebP |
| Pré-visualização | Imagem original e processada |
| Redimensionamento | Alteração de dimensões |
| Proporções | 16:9, 9:16, 1:1, 4:5, 3:4 e original |
| Recorte automático | Enquadramento centralizado |
| Encaixe proporcional | Preservação do conteúdo original |
| Exportação | JPG, PNG e WebP |
| Qualidade | Configuração para formatos compatíveis |
| Responsividade | Suporte a desktop e dispositivos móveis |

O processamento ocorre localmente no navegador, utilizando a **Canvas API**, sem necessidade de backend ou chave de API.

---

## Tecnologias

**Atualmente:**

- HTML5
- CSS3
- JavaScript
- Canvas API
- Git e GitHub
- GitHub Pages

**Tecnologias planejadas:**

- SVG.js e bibliotecas de ícones SVG
- Fabric.js
- OpenCV.js
- Node.js
- Sharp
- APIs de inteligência artificial

A adoção de novas tecnologias acontecerá conforme as necessidades das próximas versões.

---

## Como executar

### Opção 1 — Acessar online

Utilize diretamente a aplicação publicada:

**[Abrir EditPic](https://mateuscanjerana.github.io/EditPic/)**

### Opção 2 — Executar localmente

**1. Clone o repositório:**

```bash
git clone https://github.com/mateuscanjerana/EditPic.git
```

**2. Acesse a pasta:**

```bash
cd EditPic
```

**3. Abra no VS Code:**

```bash
code .
```

**4. Execute a aplicação:**

Abra o arquivo `index.html` no navegador ou utilize a extensão Live Server do VS Code.

A V0.1.0 não exige `npm install` nem configuração de serviços externos.

---

## Roadmap

| Versão | Funcionalidade | Status |
|---|---|---|
| V0.1.0 | MVP: upload, proporções, recorte e exportação | Concluída |
| V0.2.0 | Recorte manual e zoom | Planejada |
| V0.3.0 | Tratamento fotográfico básico | Planejada |
| V0.4.0 | Histórico e presets | Planejada |
| V0.5.0 | SVG Studio | Planejada |
| V0.6.0 | Processamento em lote | Planejada |
| V0.7.0 | Remoção de fundo | Planejada |
| V0.8.0 | Extensão de background | Planejada |
| V0.9.0 | Edição não destrutiva e camadas | Planejada |
| V1.0.0 | Primeira versão estável | Planejada |

### SVG Studio

Módulo planejado para criar imagens vetoriais destinadas a cards de projetos, portfólios e banners.

Recursos previstos:

- Modelos geométricos e tecnológicos.
- Personalização de cores, gradientes e formas.
- Bibliotecas públicas de ícones SVG.
- Presets de identidade visual.
- Exportação `.svg` em diferentes proporções.

### Inteligência artificial

Em versões futuras, poderão ser incorporados recursos de remoção de fundo, restauração, super-resolução e expansão de cenários.

O desenvolvimento priorizará alternativas locais e gratuitas, quando tecnicamente viáveis.

---

## Princípios de desenvolvimento

O EditPic é desenvolvido com foco em:

- **Modularidade:** responsabilidades bem definidas.
- **Manutenibilidade:** código organizado e documentado.
- **Usabilidade:** interface intuitiva e acessível.
- **Desempenho:** processamento local sempre que possível.
- **Edição não destrutiva:** preservação do arquivo original.
- **Segurança:** validação de entradas e proteção de credenciais.
- **Qualidade:** testes e evolução incremental.

---

## Versionamento

O projeto utiliza Git e GitHub seguindo o padrão:

`MAJOR.MINOR.PATCH`

Exemplos:

- `v0.1.0` — primeiro MVP.
- `v0.1.1` — correções pontuais.
- `v0.2.0` — novas funcionalidades.
- `v1.0.0` — versão estável.

As alterações são registradas em `CHANGELOG.md`.

### Padrão de commits

```bash
feat: adicionar funcionalidade
fix: corrigir erro
docs: atualizar documentação
refactor: reorganizar código
test: adicionar testes
style: ajustar interface
```

---

## Contribuições

Sugestões, relatos de problemas e propostas de melhoria são bem-vindos.

Para contribuir, abra uma *issue* ou envie um *pull request* descrevendo as modificações propostas.

## Licença

O projeto ainda não possui uma licença de distribuição definida. As condições de reutilização e redistribuição serão estabelecidas posteriormente.

---

## Desenvolvedor

**Mateus Canjerana**

Bacharel em Ciência da Computação e desenvolvedor web.

GitHub: [@mateuscanjerana](https://github.com/mateuscanjerana)

**EditPic — Simplificando o processamento de imagens para a web.**
