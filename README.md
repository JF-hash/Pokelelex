# Pokédex UC33

Uma Pokédex com servidor Node.js + Express que consome a PokéAPI. A página nunca fala direto com a PokéAPI — tudo passa pelo nosso serviço.

## Como instalar e rodar

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (reinicia a cada arquivo salvo)
npm run dev

# Compilar e rodar em produção
npm run build
npm start
```

Abra http://localhost:3000 no navegador.

## Rota da API

### `GET /api/pokemons/:termo`

Busca um Pokémon pelo nome ou número.

**Exemplo de resposta (200):**
```json
{
  "numero": 25,
  "nome": "pikachu",
  "tipos": ["electric"],
  "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
}
```

**Erros possíveis:**
- `400` — nome inválido (caracteres não permitidos)
- `404` — Pokémon não encontrado
- `503` — PokéAPI indisponível ou sem resposta em 5 segundos

## Desafios implementados

*(preencha aqui os desafios que você fizer)*

## Estrutura do projeto

```
pokedex/
├── src/
│   ├── pokeApi.ts   ← integração com a PokéAPI (cache + timeout)
│   └── server.ts    ← servidor Express com tratamento de erros
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```