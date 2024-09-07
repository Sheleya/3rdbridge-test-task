import { Pokemon, PokemonEvolution } from '../models';
import { getIdFromUrl } from './getIdFromUrl';

export const parsePokemonEvolution = ({
  data,
  currentPokemonId
}: {
  data: PokemonEvolution['chain'],
  currentPokemonId: string
}) => {
  const evolution: Pokemon[] = [];

  const parse = (chain: PokemonEvolution['chain']) => {
    const id = getIdFromUrl(chain?.species?.url ?? '');

    if (id !== currentPokemonId) {
      evolution.push({ id, name: chain?.species?.name, url: `https://pokeapi.co/api/v2/pokemon/${id}/` });
    }

    if (chain?.evolves_to.length) chain.evolves_to.forEach(parse);
  }

  parse(data);

  return evolution;
}