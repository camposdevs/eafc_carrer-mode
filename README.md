<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0A0A0A,50:1A1A1A,100:C1FF00&height=250&section=header&text=EA%20FC%20Career%20Tracker&fontSize=50&fontColor=FFFFFF&fontAlignY=38&desc=Gerencie%20seus%20modos%20carreira%20como%20um%20profissional&descAlignY=60&descSize=20&descColor=C1FF00" width="100%" />

</div>

# ⚽ EA FC Career 

Sistema profissional para gerenciamento de modos carreira do EA FC/FIFA, desenvolvido para permitir que jogadores acompanhem suas carreiras de forma organizada, permanente e detalhada.

Inspirado visualmente no EA FC, SofaScore, Transfermarkt e FotMob.

---

## 🌐 Acesse o Sistema

🔗 **Produção**

https://eafc-mu.vercel.app/login

---

## 📌 Funcionalidades

### 🔐 Autenticação

* Cadastro de usuários
* Login seguro com JWT
* Recuperação de senha
* Alteração de senha
* Logout
* Rotas protegidas
* Dados isolados por usuário

---

### ⚽ Carreiras

* Criar carreira
* Editar carreira
* Excluir carreira
* Duplicar carreira
* Favoritar carreira
* Arquivar carreira

Cada usuário possui suas próprias carreiras salvas.

---

### 🏟️ Times

Importação automática utilizando Sportmonks API:

* Nome
* Escudo
* País
* Liga
* Estádio
* Cidade

Após a importação os dados ficam independentes da API e podem ser editados manualmente.

---

### 👤 Jogadores

* Cadastro completo
* Foto
* Nacionalidade
* Idade
* Altura
* Peso
* Posição
* Overall
* Potencial
* Valor de mercado
* Salário

---

### 📋 Elenco

* Listagem completa
* Pesquisa de jogadores
* Filtro por posição
* Filtro por overall
* Gestão do elenco por temporada

---

### 🎮 Escalação

Formações disponíveis:

* 4-3-3
* 4-4-2
* 4-2-3-1
* 3-5-2
* 5-3-2
* Personalizada

Recursos:

* Titulares
* Reservas
* Capitão
* Batedor de faltas
* Batedor de pênaltis
* Batedor de escanteios

---

### 📊 Estatísticas

#### Jogadores

* Gols
* Assistências
* Partidas
* Nota média
* Cartões
* Clean Sheets
* Minutos jogados

#### Equipe

* Jogos
* Vitórias
* Empates
* Derrotas
* Gols marcados
* Gols sofridos
* Saldo de gols

---

### 🔄 Transferências

Registro completo de:

* Compras
* Vendas
* Empréstimos
* Retornos de empréstimo

Com histórico por temporada.

---

### 📅 Calendário

* Competições
* Adversários
* Datas
* Casa/Fora
* Estádio

---

### 🏆 Competições

* Liga
* Copa
* Continental
* Mundial
* Supercopa

---

### 🥇 Títulos

* Histórico de conquistas
* Dashboard de troféus
* Evolução por temporada

---

### 📈 Rankings

Ranking de:

* Artilheiros
* Assistências
* Partidas
* Clean Sheets
* Valor de mercado

---

### 📊 Dashboard

Indicadores:

* Total de carreiras
* Total de temporadas
* Total de jogos
* Total de gols
* Total de títulos

Gráficos:

* Resultados
* Evolução da carreira
* Estatísticas gerais
* Desempenho por temporada

---

## 🖥️ Telas do Sistema

### Públicas

* Login
* Cadastro
* Recuperação de Senha

### Sistema

* Dashboard
* Minhas Carreiras
* Criar Carreira
* Escolher Time
* Detalhes da Carreira
* Elenco
* Escalação
* Estatísticas
* Transferências
* Calendário
* Resultados
* Competições
* Temporadas
* Histórico
* Rankings
* Favoritos
* Configurações

---

## 🚀 Tecnologias Utilizadas

### Front-end

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge\&logo=mui\&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge\&logo=react-router\&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge\&logo=reactquery\&logoColor=white)

### Back-end

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge\&logo=jsonwebtokens)

### Banco de Dados

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge\&logo=supabase\&logoColor=white)

### API Externa

* Sportmonks Football API

---

## 📂 Estrutura do Projeto

```bash
eafc-career-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── theme/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── database/
│   │   └── server.js
│
└── README.md
```

---

## 🎯 Objetivo do Projeto

O EA FC Career Tracker foi criado para resolver uma limitação comum dos modos carreira do EA FC/FIFA: a falta de histórico detalhado e persistente.

O sistema permite registrar temporadas, transferências, estatísticas, conquistas e evolução completa da carreira, mantendo todas as informações organizadas e acessíveis em um único lugar.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0A0A0A,50:1A1A1A,100:C1FF00&height=250&section=header&text=EA%20FC%20Career%20Tracker&fontSize=50&fontColor=FFFFFF&fontAlignY=38&desc=Gerencie%20seus%20modos%20carreira%20como%20um%20profissional&descAlignY=60&descSize=20&descColor=C1FF00" width="100%" />

**Desenvolvido por Pedro Campos**

</div>