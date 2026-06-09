# Site WS Informática e Tecnologia

Site estático pronto para publicar no GitHub Pages, Netlify, Vercel ou qualquer hospedagem simples.

## Arquivos principais

- `index.html` — estrutura do site
- `css/styles.css` — estilos visuais e responsividade
- `js/main.js` — menu mobile, animações e formulário para WhatsApp
- `assets/` — logotipo e favicon em SVG

## Como editar o WhatsApp

1. Abra o arquivo `js/main.js`.
2. Troque esta linha:

```js
whatsappNumber: '5599999999999',
```

pelo número real com código do país e DDD, sem espaços, sem parênteses e sem traços.

Exemplo:

```js
whatsappNumber: '5586999999999',
```

3. No arquivo `index.html`, procure por `5599999999999` e substitua pelo mesmo número real.

## Como editar telefone e e-mail

No `index.html`, procure por:

- `(00) 00000-0000`
- `contato@wsinformatica.com.br`

Substitua pelos seus dados reais.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto para o repositório.
3. Vá em **Settings** > **Pages**.
4. Em **Source**, selecione a branch `main` e a pasta `/root`.
5. Salve e aguarde o link ser gerado.

## Observação

O formulário do site não salva dados em banco. Ele monta uma mensagem e abre o WhatsApp com as informações preenchidas.
