# STAR STUDIO CAR — Deploy & Instruções

Este repositório contém a versão estática do sistema *STAR STUDIO CAR* (front-end) pronta para hospedar no GitHub Pages ou em qualquer servidor web.

## O que há aqui
- `index.html` — página principal (interface, agenda, novo serviço, histórico, config)
- `outro/index.html` — cópia/variante
- `logo.png`, `readme.txt` e outros assets

## Objetivo
Publicar rapidamente no GitHub Pages para demonstração/uso local (MVP). Atualmente as configurações de preços são salvas no `localStorage` do navegador (persistência do lado do cliente).

## Publicar no GitHub (GitHub Pages)
Se já tem repositório (ex.: `https://github.com/luiscadeira/Star`), faça o push destes arquivos para a branch `main` e ative o GitHub Pages:

1. No terminal, na pasta do projeto:

```bash
git init                   # se ainda não for um repositório
git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
git add .
git commit -m "Init STAR STUDIO CAR"
git branch -M main
git push -u origin main
```

2. No GitHub > Settings > Pages: escolha `Branch: main` e `folder: / (root)` e salve. Seu site ficará em `https://<seu-usuario>.github.io/<seu-repo>/`.

> Observação: GitHub Pages serve arquivos estáticos apenas (HTML/CSS/JS). Não roda PHP.

## Como usar (funcionalidades relevantes)
- Aba `CONFIG`: edite preços de serviços e clique em `Salvar` — os valores ficam salvos no `localStorage` do navegador.
- Aba `NOVO SERVIÇO`: selecione serviços e gere mensagens; os preços são lidos dos serviços configurados.

## Persistência em servidor (opcional)
Se quiser salvar as configurações no servidor (para compartilhar entre dispositivos/operadores), é preciso um backend. Duas opções rápidas:

1) PHP simples (hospedar em servidor que rode PHP)

- `save_services.php` (exemplo simples) — recebe JSON via POST e grava em `services.json`:

```php
<?php
// save_services.php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
$raw = file_get_contents('php://input');
if (!$raw) { http_response_code(400); echo 'empty'; exit; }
file_put_contents(__DIR__.'/services.json', $raw);
echo 'ok';
```

- Client-side (JS): fazer `fetch('/save_services.php', { method: 'POST', body: JSON.stringify(services) })`

Importante: este exemplo não tem autenticação; não use em produção sem segurança (auth + validação + CORS correto).

2) API/DB (recomendado para produção)
- Use um backend (Node, PHP, Python) ou BaaS (Supabase, Base44) para guardar preços por conta/loja.
- Autentique operadores e exponha endpoints para GET/PUT de `services`.

## Próximos passos que posso implementar para você
- Gerar `save_services.php` e adaptar o front para alternar entre `localStorage` e `remote` (botão/flag).
- Criar script de deploy automático (Git + GitHub Pages) ou pipeline simples.
- Ajustes visuais finais para ficar idêntico ao design do anexo.

Diga qual próximo passo prefere: **(A)** somente instruções e eu paro aqui; **(B)** adiciono `save_services.php` + cliente JS para salvar remotamente; **(C)** eu adapto o front para alternar entre `localStorage` e endpoint remoto automaticamente.

## Progressive Web App (PWA)
Para transformar a página em um "app" instalável no celular, o projeto já inclui:

- `manifest.json` — descreve nome, ícones e modo `standalone`.
- `sw.js` — service worker simples para cache offline.

O que fazer para funcionar como app:
1. Coloque um arquivo `Icon.png` na raiz do projeto (imagem quadrada, idealmente 512x512).
2. Publique no GitHub Pages (ou servidor HTTPS). PWA só instala em páginas servidas por HTTPS (GitHub Pages já serve via HTTPS).
3. Abra o site no celular (Chrome/Android): o navegador oferecerá "Adicionar à tela inicial"; no iOS use o botão de compartilhar → "Adicionar à Tela de Início".

Se quiser, eu posso gerar `Icon.png` em diferentes tamanhos (requer a imagem original) ou criar a rota `save_services.php` para persistência no servidor.