# Git + GitHub — roteiro prático do EditPic

## 1. Tenha uma única pasta versionada

Recomendação: extraia `V0.1.0.zip` e **renomeie a pasta extraída de `V0.1.0` para `EditPic`** em um local novo do seu computador. Abra essa pasta no VS Code. Os arquivos `index.html`, `src/` e `README.md` ficam diretamente nessa pasta.

Não coloque `V0.1.0/`, `V0.2.0/`, `V0.3.0/` como subpastas do mesmo repositório. Quando chegar uma atualização, modifique **os mesmos arquivos**: o Git mantém todas as versões anteriores.

## 2. Faça o primeiro commit

No terminal PowerShell do VS Code, na pasta `EditPic`:

```powershell
git --version
git init -b main
git add .
git status
git commit -m "feat: criar MVP EditPic v0.1.0"
```

Se o Git pedir nome e email, configure uma única vez (use seus próprios dados):

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
```

O comando `git status` é útil para revisar o que será enviado.

## 3. Crie um repositório vazio no GitHub

1. Acesse https://github.com/new.
2. Nome: `EditPic`.
3. Para começar com GitHub Pages no plano gratuito, **público** é o caminho mais simples. O código deste MVP não contém chaves nem dados privados.
4. **Não** marque a criação de README, `.gitignore` ou licença no GitHub; já existem arquivos locais.
5. Copie a URL HTTPS do repositório vazio.

De volta ao terminal (substitua SEU_USUARIO):

```powershell
git remote add origin https://github.com/SEU_USUARIO/EditPic.git
git push -u origin main
```

Se o GitHub pedir login, conclua a autenticação no navegador (ou no gerenciador de credenciais configurado).

## 4. Marque a primeira versão

```powershell
git tag -a v0.1.0 -m "MVP do EditPic"
git push origin v0.1.0
```

A tag identifica o commit da versão. Depois, em GitHub > Releases, você pode criar um release dessa tag e anexar `V0.1.0.zip`, se desejar. **Não envie o ZIP para dentro da pasta de código do repositório.**

## 5. Coloque online no GitHub Pages

Repositório > **Settings** > **Pages** > **Build and deployment**:

- **Source:** Deploy from a branch
- **Branch:** main
- **Folder:** /(root)
- Salve e acompanhe a publicação na aba Actions.

A URL será semelhante a: `https://SEU_USUARIO.github.io/EditPic/`.

Atenção: GitHub Pages publica sites estáticos. Ele **não** executará um backend Node.js nem guardará credenciais de API. Para essa fase inicial, não precisamos de backend.

## 6. Próxima versão: trabalhar em branch

Antes de começar a v0.2.0:

```powershell
git switch -c feature/recorte-manual
```

Faça pequenas mudanças e commits. Por exemplo:

```powershell
git add .
git commit -m "feat: preparar interacao de recorte manual"
git push -u origin feature/recorte-manual
```

No GitHub, abra um **Pull Request** para a `main`, verifique os testes e mescle as alterações. Então, atualize a cópia local:

```powershell
git switch main
git pull origin main
git tag -a v0.2.0 -m "Recorte manual"
git push origin v0.2.0
```

## Significado dos comandos

| Comando | O que faz |
|---|---|
| `git status` | Mostra arquivos alterados e preparados para commit. |
| `git add .` | Prepara os arquivos modificados. |
| `git commit -m "..."` | Salva uma etapa do desenvolvimento. |
| `git push` | Envia commits ao GitHub. |
| `git switch -c nome` | Cria e acessa uma branch de desenvolvimento. |
| `git tag` | Marca um lançamento específico. |
| `git log --oneline` | Mostra o histórico de commits. |

## Regra de ouro

- `main`: sempre funcional.
- Branch `feature/...`: recursos em desenvolvimento.
- Versões: tags `v0.1.0`, `v0.2.0` etc.
- ZIPs de entrega: `V0.1.0.zip`, `V0.2.0.zip` etc. Arquivados fora do repositório de código.
- `CHANGELOG.md`: registra as alterações entre versões.
- Chaves privadas: nunca colocar no frontend ou no GitHub.
