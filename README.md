# Ruas Vivas 🏙️

**CitizenTech — Global Solution FIAP 2026.2**

Plataforma web demonstrativa para ajudar pedestres a **comparar características observáveis de trajetos urbanos**: distância, extensão de muros contínuos, fachadas ativas e iluminação registrada.

> **Importante:** todos os trajetos e números são fictícios. O projeto não calcula rotas reais, não monitora criminalidade e não garante segurança.

## Integrantes

Em ordem alfabética:

| Nome | RM |
| --- | --- |
| Ariana Cristina Arai Jesus | 570051 |
| Gabriela di Sousa Rodrigues | 570213 |
| Hugo D'Angelo | 571523 |
| Larissa Sayuri Ribeiro | 573300 |

## Rodar localmente

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

Para o GitHub Pages, o build usa o nome do repositório:

```bash
VITE_BASE=/fiap-global-solution-ruas-vivas/ npm run build
```

O comando de build também copia `dist/index.html` para `dist/404.html`, para as rotas da aplicação abrirem direto no Pages.

## Tecnologias

React 18, TypeScript, Vite, React Router, CSS e Lucide React. Não há backend.

## Telas e jornada

1. **Início (`/`)**: conhece o problema e escolhe comparar trajetos ou avaliar um trecho.
2. **Comparar (`/comparar`)**: escolhe um critério, compara três trajetos fictícios e seleciona um caminho. A seleção abre o próximo passo, com o resumo do trajeto e o caminho para avaliar ou ver o bairro.
3. **Avaliar (`/avaliar`)**: registra uma observação. Se o cidadão veio da comparação, o nome do trajeto já vem preenchido. Os dados ficam somente no `localStorage` do navegador.
4. **Meu bairro (`/bairro`)**: mostra os indicadores simulados, filtra os trechos de exemplo e lista as observações salvas neste navegador, marcadas como não verificadas.

## Interações JavaScript

- Ordenação dinâmica de trajetos por critério escolhido, para a pessoa decidir o que priorizar.
- Seleção de trajeto com feedback acessível (`aria-live`) e um passo seguinte, para a escolha não terminar na tela.
- Formulário com mensagens de erro por campo e confirmação depois do envio. A persistência local guarda a observação neste navegador.
- Filtro dos trajetos de exemplo e leitura das observações locais, para o registro aparecer no panorama do bairro.

## Acessibilidade

HTML semântico, navegação por teclado, link para pular ao conteúdo, foco visível, labels de formulários, mensagens de erro e de confirmação, textos simples e layout responsivo.

## Relação com ODS

**ODS 11 — Cidades e Comunidades Sustentáveis**, em especial a discussão sobre espaços urbanos inclusivos e experiência dos pedestres.

## Links da entrega

- **Repositório:** https://github.com/arianaarai/fiap-global-solution-ruas-vivas
- **Deploy:** https://arianaarai.github.io/fiap-global-solution-ruas-vivas/
- **Vídeo-pitch:** [Adicionar após publicação]
- **PDF:** entregue na plataforma da FIAP.

## Limitações e próximos passos

O mapa é ilustrativo e os dados não correspondem a ruas reais. A aplicação não recomenda rotas com base em segurança. Em uma evolução futura, dados geográficos verificáveis e contribuições moderadas poderiam apoiar comparações reais.
