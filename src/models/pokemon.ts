export type Pokemon = {
  id?: string;
  name: string;
  url: string;
}

export type PokemonMove = {
  move: Pokemon;
};

export type PokemonType = {
  slot: number;
  type: Pokemon;
};

export type PokemonDetails = {
  id: string;
  name: string;
  types: PokemonType[];
  moves: PokemonMove[];
  sprites: {
    front_default: string;
  };
};

export type PokemonSpecies = {
  id: string;
  evolution_chain: {
    url: string
  },
};

export type PokemonChain = {
  species: Pokemon;
  evolves_to: PokemonChain[];
}

export type PokemonEvolution = {
  id: string;
  chain: PokemonChain;
};