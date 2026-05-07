# 🎬 PanelDirector

**PanelDirector** é um sistema avançado de controle e exibição de fundos dinâmicos baseados na biblioteca **Neat Gradient**. Projetado para criadores de conteúdo, streamers e produtores de eventos, ele oferece uma interface intuitiva para manipular gradientes complexos em tempo real.

![Preview do Projeto](https://img.shields.io/badge/Status-Desenvolvimento-green?style=for-the-badge)
![Tecnologias](https://img.shields.io/badge/HTML5-JS-CSS3-orange?style=for-the-badge)

---

## 🚀 Funcionalidades principais

- **Controle Total de Cores:** Gerencie até 6 camadas de cores com seletores individuais e toggles de ativação.
- **Dinâmica de Animação:** Ajuste velocidade, amplitude de ondas e frequência (X/Y) para criar movimentos fluidos.
- **Efeitos Visuais Avançados:** 
  - **Flow Field:** Distorção procedural baseada em fluxo.
  - **Procedural Texture:** Injeção de formas geométricas (triângulos, círculos, barras) diretamente no gradiente.
  - **Warp & Vignette:** Deformação de domínio e sombras periféricas.
  - **Fresnel & Iridescence:** Efeitos de reflexo e brilho perolado.
- **Pós-Processamento:** Adicione Bloom (brilho) e Aberração Cromática para um visual cinematográfico.
- **Sincronização em Tempo Real:** Comunicação via `BroadcastChannel` entre o painel de controle e a janela de exibição.
- **Gerenciamento de Presets:** Salve suas configurações favoritas, exporte para o clipboard ou importe configurações externas.
- **Pronto para OBS:** Integração preparada para plugins do OBS Studio.

---

## 📂 Estrutura do Projeto

O projeto é composto por arquivos estáticos simples, facilitando o uso offline:

- `Painel de controle.html`: A interface administrativa com todos os sliders e controles.
- `exibição.html`: A página de saída (output) que deve ser capturada pelo OBS ou exibida em um telão.
- `script.js`: Toda a lógica de sincronização e manipulação de dados.
- `style.css`: Estilização premium do painel de controle.

---

## 🛠️ Como usar

1. **Abra a Exibição:** Execute o arquivo `exibição.html` em seu navegador de preferência.
2. **Abra o Painel:** Execute o arquivo `Painel de controle.html`.
3. **Controle:** Qualquer alteração feita no painel refletirá instantaneamente na janela de exibição.
4. **No OBS:** 
   - Adicione uma **Fonte de Navegador** apontando para o arquivo `exibição.html`.
   - Use o painel em uma janela separada ou como um **Painel de Navegador Personalizado** dentro do OBS.

---

## 🎨 Personalização Tecnológica

O sistema utiliza a biblioteca [Neat Gradient](https://firecms.co/docs/neat_gradient) para renderização via WebGL, garantindo alta performance mesmo em configurações complexas.

---

## 📄 Licença

Este projeto é de uso livre para personalização e produção de conteúdo.

---
*Desenvolvido com ❤️ para a comunidade de live streaming.*
