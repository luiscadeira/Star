# 🚗 STAR STUDIO CAR - Sistema de Gestão de Serviços Automotivos

Sistema completo para gerenciamento de serviços automotivos, agendamentos, orçamentos e comunicação com clientes via WhatsApp.

---

## 📋 Sobre o Projeto

O **STAR STUDIO CAR** é uma aplicação web moderna desenvolvida para facilitar a gestão de serviços de estética automotiva. O sistema oferece ferramentas para:

- ✅ Criação rápida de orçamentos personalizados
- 📅 Agendamento semanal de serviços
- 📊 Histórico completo de atendimentos
- 💬 Comunicação automatizada via WhatsApp
- ⚙️ Configuração flexível de serviços e preços
- 📝 Controle de vistorias e observações

---

## 🎯 Funcionalidades Principais

### 1️⃣ **Novo Serviço**
Interface completa para criação de orçamentos e agendamentos:
- Cadastro de cliente e veículo.
- Seleção de serviços com preços configuráveis.
- Geração automática de mensagens para WhatsApp (Agendamento e Aviso de Pronto).
- Cálculo automático do valor total e salvamento no histórico.

### 2️⃣ **Agenda Semanal**
Controle visual da disponibilidade:
- Visualização de segunda a domingo.
- Status personalizados (Aberta, Reservado, A confirmar).
- Compartilhamento da agenda formatada via WhatsApp.

### 3️⃣ **Histórico de Serviços**
- Lista de todos os serviços cadastrados.
- Informações de placa, cliente, data e valor.
- Botão rápido para enviar aviso de "Pronto" via WhatsApp.

### 4️⃣ **Configurações**
- Gerenciamento de serviços, preços e ícones.
- Tudo salvo localmente ou sincronizado com o servidor.

---

## 🛠 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla).
- **Persistência:** LocalStorage (Cliente) e suporte a PHP/JSON (Servidor).
- **PWA:** Suporte a Progressive Web App para instalação no celular.
- **Integrações:** WhatsApp API e Google Maps.

---

## 🚀 Como Instalar e Publicar

### 1. Uso Local (Windows/WAMP)
1. Copie a pasta para `c:\wamp64\www\starstudio`.
2. Acesse `http://localhost/starstudio` no seu navegador.

### 2. Publicar no GitHub Pages
O projeto está pronto para ser hospedado no GitHub Pages (arquivos estáticos):

1. Crie um repositório no GitHub.
2. Faça o push dos arquivos:
```bash
git init
git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
git add .
git commit -m "Deploy STAR STUDIO CAR"
git branch -M main
git push -u origin main
```
3. No GitHub > **Settings** > **Pages**: escolha a branch `main` e a pasta `/ (root)`.

---

## 📱 Progressive Web App (PWA)

O sistema é instalável como um aplicativo:
- **Android:** O Chrome oferecerá "Adicionar à tela inicial".
- **iOS:** Use o botão Compartilhar -> "Adicionar à Tela de Início".

*Requisito: O site deve ser servido via HTTPS (como no GitHub Pages).*

---

## 🔧 Persistência de Dados

Atualmente, as configurações são salvas no **localStorage** do navegador. 

### Sincronização com Servidor (Opcional)
Para salvar os dados permanentemente em um servidor que suporte PHP:
1. O arquivo `save_services.php` pode ser usado para gravar em `services.json`.
2. O sistema tentará sincronizar automaticamente se o endpoint estiver disponível.

---

## 📞 Contato

**STAR STUDIO CAR** 🚗✨  
Luis - Especialista em Estética Automotiva  
📍 [Localização no Google Maps](https://maps.app.goo.gl/KPY28spUTp2C3Xp58)

---
**Desenvolvido para STAR STUDIO CAR**
