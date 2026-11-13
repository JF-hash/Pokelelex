const $ = (id) => document.getElementById(id);
let numeroAtual = 0;

// Tradução dos tipos para português
const TIPOS_PT = {
  normal:   'Normal',
  fire:     'Fogo',
  water:    'Água',
  electric: 'Elétrico',
  grass:    'Planta',
  ice:      'Gelo',
  fighting: 'Lutador',
  poison:   'Veneno',
  ground:   'Terra',
  flying:   'Voador',
  psychic:  'Psíquico',
  bug:      'Inseto',
  rock:     'Pedra',
  ghost:    'Fantasma',
  dragon:   'Dragão',
  dark:     'Sombrio',
  steel:    'Aço',
  fairy:    'Fada',
};

// Cor principal de cada tipo (usada no fundo da Pokédex)
const CORES_TIPO = {
  normal:   '#9ca38f',
  fire:     '#ea580c',
  water:    '#2563eb',
  electric: '#ca8a04',
  grass:    '#16a34a',
  ice:      '#0891b2',
  fighting: '#c03028',
  poison:   '#9333ea',
  ground:   '#b45309',
  flying:   '#7c6fcd',
  psychic:  '#db2777',
  bug:      '#65a30d',
  rock:     '#a16207',
  ghost:    '#4f46e5',
  dragon:   '#7038f8',
  dark:     '#57534e',
  steel:    '#475569',
  fairy:    '#db2777',
};

async function pedirPokemon(termo) {
  let resposta;
  try {
    resposta = await fetch(`/api/pokemons/${encodeURIComponent(termo)}`);
  } catch {
    throw new Error('Sem conexão com o servidor. Ele está rodando?');
  }
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(corpo.erro ?? `Erro ${resposta.status}`);
  return corpo;
}

function mostrarAviso(texto, tipo = 'erro') {
  $('aviso').textContent = texto;
  $('aviso').className = `aviso ${tipo}`;
  $('aviso').hidden = false;
}

function aplicarTema(tipoPrincipal) {
  const cor = CORES_TIPO[tipoPrincipal] ?? '#dc2626';
  document.querySelector('.pokedex').style.setProperty('--cor-tipo', cor);
}

function mostrarPokemon(p) {
  numeroAtual = p.numero;
  $('aviso').hidden = true;
  $('numero').textContent = `#${String(p.numero).padStart(3, '0')}`;
  $('nome').textContent = p.nome;

  $('tipos').replaceChildren(...p.tipos.map((tipo) => {
    const li = document.createElement('li');
    li.textContent = TIPOS_PT[tipo] ?? tipo;  // mostra em português, cai no inglês se não achar
    li.className = `tipo tipo-${tipo}`;        // classe continua em inglês para o CSS funcionar
    return li;
  }));

  const img = $('imagem');
  img.hidden = !p.imagem;
  if (p.imagem) { img.src = p.imagem; img.alt = p.nome; }

  $('altura').textContent = `${p.altura.toFixed(1)} m`;
  $('peso').textContent = `${p.peso.toFixed(1)} kg`;

  aplicarTema(p.tipos[0]);  // usa o primeiro tipo como cor dominante
}

function travarBotoes(travar) {
  for (const b of document.querySelectorAll('button')) b.disabled = travar;
  if (!travar) $('anterior').disabled = numeroAtual <= 1;
}

async function buscar(termo) {
  mostrarAviso('Buscando...', 'info');
  travarBotoes(true);
  try {
    mostrarPokemon(await pedirPokemon(termo));
  } catch (erro) {
    mostrarAviso(erro.message);
  } finally {
    travarBotoes(false);
  }
}

$('imagem').addEventListener('error', () => { $('imagem').hidden = true; });
$('busca').addEventListener('submit', (e) => {
  e.preventDefault();
  buscar(e.target.termo.value.trim());
});
$('anterior').addEventListener('click', () => buscar(String(numeroAtual - 1)));
$('proximo').addEventListener('click', () => buscar(String(numeroAtual + 1)));
$('aleatorio').addEventListener('click', () => {
  const sorteio = Math.floor(Math.random() * 151) + 1;
  buscar(String(sorteio));
});

buscar('1');