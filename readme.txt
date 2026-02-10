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
- Cadastro de cliente e veículo
- Seleção de serviços com preços configuráveis
- Escolha de data e horário
- Grid de vistoria (riscado, amassado, quebrado, sujo, manchado)
- Campo para link de fotos
- **Observações importantes sobre o serviço**
- Geração automática de mensagens para WhatsApp
- Botão especial "GERAR AVISO DE PRONTO" para notificar cliente
- Cálculo automático do valor total
- Salvamento automático no histórico

**Mensagens Geradas:**
- **Agendamento:** Confirmação com data, hora, serviços e localização
- **Pronto:** Notificação de conclusão com fotos e valor total

### 2️⃣ **Agenda Semanal**
Controle visual da disponibilidade:
- Visualização semanal (segunda a sábado)
- Status personalizados:
  - 🟢 Disponível
  - 🔴 Lotado
  - 🟡 1 Vaga
  - ⚫ Fechado
- Navegação entre semanas
- Compartilhamento da agenda via WhatsApp
- Salvamento automático das configurações

### 3️⃣ **Últimos Serviços**
Histórico completo de atendimentos:
- Lista de todos os serviços cadastrados
- Filtros por status (agendado, em andamento, concluído)
- Informações exibidas:
  - Placa do veículo
  - Nome do cliente
  - Data do serviço
  - Valor total
  - Serviços realizados
  - **Observações do serviço**
- **Botão "AVISAR PRONTO"** em cada item para enviar mensagem automática
- Exclusão de registros
- Status visual com cores

### 4️⃣ **Configurações**
Gerenciamento de serviços e preços:
- Lista de serviços personalizável
- Edição individual de:
  - Nome do serviço
  - Preço
  - Emoji/ícone
  - Ordem de exibição
- **Botão "Salvar" individual** para cada serviço
- Adição e remoção de serviços
- Atualização em tempo real nos orçamentos

---

## 🛠 Tecnologias Utilizadas

### **Frontend**
- **React** - Biblioteca principal
- **Framer Motion** - Animações fluidas
- **TailwindCSS** - Estilização responsiva
- **Shadcn/UI** - Componentes de interface
- **Lucide React** - Ícones modernos

### **Backend & Dados**
- **Base44 SDK** - Backend as a Service
- **TanStack React Query** - Gerenciamento de estado e cache
- **Real-time Subscriptions** - Atualizações em tempo real

### **Integrações**
- **WhatsApp API** - Envio de mensagens
- **Google Maps** - Localização da loja

---

## 📦 Estrutura de Dados

### **ServiceRecord** (Registro de Serviço)
```json
{
  "plate": "ABC1234",
  "client_name": "João Silva",
  "vehicle_info": "Honda Civic 2020",
  "services": [
    {
      "name": "Lavagem Completa",
      "price": 80
    },
    {
      "name": "Polimento",
      "price": 300
    }
  ],
  "total": 380,
  "service_date": "2026-02-15",
  "service_time": "14:00",
  "inspection_issues": ["Riscado", "Sujo"],
  "photos_link": "https://...",
  "observations": "Cliente pediu atenção especial nos bancos",
  "status": "agendado"
}
```

### **ServicePrice** (Preço de Serviço)
```json
{
  "service_name": "Lavagem Completa",
  "price": 80,
  "icon": "🚿",
  "order": 1
}
```

### **WeekSchedule** (Agenda Semanal)
```json
{
  "week_start": "2026-02-10",
  "slots": [
    {
      "day": "Segunda",
      "date": "10/02",
      "status": "disponivel"
    }
  ]
}
```

---

## 🎨 Design e UX

### **Tema Visual**
- Design glassmorphism com efeitos de vidro
- Gradientes dourados e amarelos (identidade da marca)
- Animações suaves e responsivas
- Interface mobile-first
- Backgrounds temáticos por seção

### **Componentes Customizados**
- **GlassCard** - Card com efeito de vidro fosco
- **ServiceCard** - Seletor visual de serviços
- **InspectionGrid** - Grid interativo de vistoria
- **Skeleton Loaders** - Indicadores de carregamento

---

## 📱 Fluxo de Uso

### **Cenário Típico:**

1. **Cliente liga para agendar**
   - Operador abre a aba "Novo Serviço"
   - Preenche nome, placa/veículo, data e hora
   - Seleciona os serviços desejados
   - Adiciona observações importantes
   - Sistema calcula o total automaticamente

2. **Confirmação**
   - Clica em "ENVIAR PARA WHATSAPP"
   - Mensagem é gerada com todos os detalhes
   - Cliente recebe confirmação profissional
   - Serviço é salvo no histórico

3. **Atualização da Agenda**
   - Vai para aba "Agenda"
   - Marca o dia correspondente como "1 Vaga" ou "Lotado"
   - Compartilha agenda atualizada nas redes

4. **Conclusão do Serviço**
   - Vai para "Últimos Serviços"
   - Localiza o serviço do cliente
   - Clica em "AVISAR PRONTO"
   - Cliente recebe notificação automática

---

## 🔧 Configuração

### **Serviços Padrão:**
- 🚿 Lavagem Completa - R$ 80
- ✨ Polimento - R$ 300
- 🌟 Enceramento - R$ 150
- 💎 Vitrificação - R$ 800
- 🧼 Higienização Interna - R$ 120
- 🔷 Cristalização - R$ 400

### **Status de Serviço:**
- 🟡 Agendado
- 🔵 Em andamento
- 🟢 Concluído

### **Localização:**
- Link do Google Maps configurado
- Incluído automaticamente em todas as mensagens

---

## 🚀 Próximas Melhorias Sugeridas

- [ ] Campo de telefone do cliente (envio direto via WhatsApp)
- [ ] Controle de pagamento (pago/pendente)
- [ ] Filtros avançados no histórico
- [ ] Dashboard com estatísticas mensais
- [ ] Upload de fotos antes/depois
- [ ] Relatórios de faturamento
- [ ] Sistema de notificações

---

## 📞 Contato

**STAR STUDIO CAR** 🚗✨  
Luis - Especialista em Estética Automotiva

📍 [Localização no Google Maps](https://maps.app.goo.gl/KPY28spUTp2C3Xp58)

---

## 📄 Licença

Sistema desenvolvido exclusivamente para STAR STUDIO CAR.

---

**Desenvolvido com ❤️ usando Base44 Platform**