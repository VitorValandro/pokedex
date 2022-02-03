<h1 align="center">
  <img width="200px" src="https://user-images.githubusercontent.com/50156875/152416537-5557dd13-4fe4-4b9a-92e1-3c9a19562fbe.png"/>
  <br />
</h1>

Pokédex é um desafio técnico para uma vaga de Desenvolvedor Front-End.

## Sobre o projeto
Me diverti bastante desenvolvendo a página, e apliquei ao máximo meus conhecimentos técnicos no código. Manti a estrutura e código do projeto estruturados e escaláveis, e não usei bibliotecas externas ao React (exceto Jest para os testes automatizados), nem para a parte de componentização e nem para o fetch e tratamento de dados da API, fiz tudo com JavaScript ES6+ e o super set TypeScript para melhorar a produtividade e qualidade do desenvolvimento. Não usei nenhum pré-processador CSS.

A principal dificuldade foi manipular os dados da API, que não tinha paginação ou filtros, então implementei uma paginação no client-side para melhorar a experiência do usuário através de uma lista de scroll infinito. Usei programação funcional para aplicar os filtros propostos, com os métodos `filter`,`sort` e `map` do protótipo `Array` do ES6. Não explorei muitos hooks do React porque não senti necessidade. Orientei o desenvolvimento com base nas estórias propostas e segui as imagens do design como referência, sem mudar muita coisa.

Achei o projeto completo e conseguiu abordar boa parte dos fundamentos usados em todos os projetos, então acho que é uma boa métrica de avaliação. Se quiser conversar e discutir o código e decisões técnicas, pode me chamar!

## Features

- Consumo e tratamento dos dados da API;
- Listagem de pokemons com scroll infinito;
- Marcar pokemon como favorito (salvo no local storage do navegador);
- Campo de busca reativo;
- Ordenação da listagem:
  - Pelo registro do pokemon (ascendente e descendente);
  - Pelo nome do pokemon (A-Z e Z-A);
- Filtros da listagem:
  - Filtrar pelo tipo do pokemon;
  - Filtar pokemons favoritados;

## Instalação

### Requisitos
- Git;
- NodeJS;
- Gerenciador de pacotes (npm ou yarn);

Primeiro, clone o repositório:

```bash
git clone https://github.com/VitorValandro/pokedex
```

Vá para o diretório do projeto e instale as dependências:

```bash
npm install ou yarn
```

Antes de rodar o projeto, execute os testes automatizados:

```bash
npm test ou yarn test
```

Para executar o projeto em ambiente de desenvolvimento [localhost:3000]:

```bash
npm start ou yarn start
```

Para fazer o build da aplicação (diretório build):

```bash
npm run build
```

## Final
O projeto está em produção e rodando através da plataforma Vercel, [acesse aqui](https://pokedex-vitorvalandro.vercel.app).

###### O design das páginas, ícones e artes não foram feitos por mim.

###### Vitor Matheus Valandro da Rosa. February 2021.
