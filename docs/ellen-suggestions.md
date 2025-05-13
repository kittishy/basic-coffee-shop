# Ellen Suggestions for Lisa's Café

Este documento registra as sugestões e observações da Ellen para o projeto Lisa's Café, visando garantir alinhamento estético, funcionalidade e clareza de marca.

## Identidade Visual (Conceituação Inicial - 24/07/2024)

*   **Logo:**
    *   [x] Proposta de logo em SVG adicionada em `assets/images/logo.svg`.
    *   [ ] Variações do logo para diferentes fundos (claro/escuro) - *A ser desenvolvido*.
    *   [x] Logo SVG integrado ao `index.html`.
    *   [x] Estilos básicos para o logo SVG adicionados ao `css/style.css`.
*   **Paleta de Cores:**
    *   [x] Cores primárias e secundárias (tons neutros, pastéis, acentos de madeira) definidas em `css/style.css` como variáveis CSS.
    *   Exemplo de paleta sugerida:
        *   `--primary-color`: #F5F5F5 (Branco Suave)
        *   `--secondary-color`: #E0D8D3 (Bege Rosado)
        *   `--accent-color-wood`: #A07855 (Madeira Clara)
        *   `--accent-color-pastel`: #D4E2D4 (Verde Pastel Suave)
        *   `--text-color`: #333333 (Cinza Escuro para contraste)
*   **Tipografia:**
    *   [x] Fontes elegantes e calmas para títulos (Lora) e corpo de texto (Open Sans) selecionadas e definidas em `css/style.css`.
    *   [x] Fontes importadas via Google Fonts em `index.html`.
    *   Sugestão:
        *   Títulos: Uma fonte serifada delicada (ex: Playfair Display ou Lora).
        *   Corpo: Uma fonte sans-serif limpa e legível (ex: Montserrat ou Open Sans).

## Landing Page (Estrutura Inicial - 24/07/2024)

*   **`index.html`:**
    *   [x] Estrutura semântica HTML5 criada.
    *   [x] Meta tags para SEO e responsividade adicionadas.
*   **`css/style.css`:**
    *   [x] Reset CSS básico implementado.
    *   [x] Estilos globais (tipografia, cores baseadas nas variáveis) definidos.
    *   [x] Estrutura inicial para layout responsivo (mobile-first) com media query básica.

## Próximos Passos Concluídos:

1.  [x] Criar `index.html` com a estrutura básica.
2.  [x] Criar `css/style.css` com reset e variáveis de cor/tipografia iniciais.
3.  [x] Criar a pasta `assets/images/`.
4.  [x] Criar `assets/images/logo.svg` (placeholder).
5.  [x] Integrar `logo.svg` no `index.html`.
6.  [x] Adicionar estilos básicos para o logo no `css/style.css`.

## Próximos Passos para Desenvolvimento (24/07/2024):

1.  **Seção Hero (`#hero`):**
    *   [x] Adicionar um CTA (Call To Action) sutil (ex: "Ver Menu") - *Concluído*.
    *   [x] Refinar estilos para tipografia, espaçamento e alinhamento - *Concluído*.
    *   [x] *Sugestão Ellen:* Considerar uma imagem de fundo de alta qualidade com iluminação natural ou uma textura suave para esta seção. - *Sugestão anotada. Requer criação do arquivo `assets/images/hero-bg.jpg` pela equipe.*
2.  **Seção Menu (`#menu`):**
    *   [x] Estruturar HTML para categorias (ex: Cafés, Doces, Salgados) e itens de menu com descrição e preço - *Concluído*.
    *   [x] Estilizar com foco na clareza, usando a paleta de cores e tipografia definidas, mantendo o minimalismo - *Concluído*.
3.  **Seção Sobre Nós (`#sobre`):**
    *   [x] Estruturar HTML para apresentar a história/filosofia do Lisa's Café - *Concluído*.
    *   [x] *Sugestão Ellen:* Utilizar uma combinação de texto conciso e talvez uma imagem que represente o ambiente ou os fundadores - *Implementado*.
    *   [x] Estilizar para ser acolhedor e transmitir a identidade da marca - *Concluído*.
4.  **Seção Galeria (`#galeria`):**
    *   [x] Estruturar HTML para uma grade de imagens (placeholders inicialmente) - *Concluído*.
    *   [x] Estilizar para ser visualmente atraente e "Instagramável", com espaçamento adequado e talvez efeitos sutis de hover - *Concluído*.
    *   [x] *Sugestão Ellen:* As imagens devem refletir a estética coreana minimalista, com foco em produtos, ambiente e detalhes - *Considerado na estrutura de placeholders e estilos*.
5.  **Seção Localização (`#localizacao`):**
    *   [x] Estruturar HTML para endereço completo, um placeholder para mapa interativo (ex: Google Maps embed) e horário de funcionamento - *Concluído*.
    *   [x] Estilizar para clareza e fácil acesso à informação - *Concluído*.
6.  **Identidade Visual Adicional:**
    *   [x] Refinar o design do logo (`assets/images/logo.svg`) para algo mais estilizado, incorporando um ícone sutil se apropriado. - *Sugestão anotada. Requer revisão da equipe de design ou ação manual.*
    *   [x] Favicon: Garantir que o arquivo `assets/images/favicon.ico` seja criado e esteja corretamente linkado no `index.html`. - *Tarefa anotada. Requer criação manual do arquivo `assets/images/favicon.ico`.*
    *   [x] Considerar variações do logo para diferentes fundos. - *Sugestão anotada. Requer revisão da equipe de design.*
7.  **Responsividade e Testes:**
    *   [x] Melhorar responsividade com media queries mais específicas (`css/style.css`) - *Implementado, revisão contínua ideal*.
    *   [x] Adicionar atributos ARIA básicos para semântica e acessibilidade (`index.html`) - *Implementado, revisão contínua ideal*.
8.  **Conteúdo:**
    *   [x] Substituir todos os textos "Em breve..." por conteúdo placeholder mais descritivo ou final - *Concluído*. (*Nota: O texto restante em `index.html` na seção galeria é uma observação informativa.*)

---
*Atualizado em: 25/07/2024 10:30*