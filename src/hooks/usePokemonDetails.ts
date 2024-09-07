import { useQuery } from '@tanstack/react-query';
import { PokemonService } from '../services';
import { parsePokemonEvolution } from '../utils';

export const usePokemonDetails = (id: string) => {
  const pokemonDetailsQuery = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => PokemonService.getPokemonDetails(id),
    enabled: !!id,
  });

  const pokemonSpeciesQuery = useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => PokemonService.getPokemonSpecies(id),
    enabled: !!id,
  });

  const evolutionChainUrl = pokemonSpeciesQuery.data?.evolution_chain.url;

  const pokemonEvolutionQuery = useQuery({
    queryKey: ['pokemonEvolutioj', evolutionChainUrl, id],
    queryFn: () => PokemonService.getPokemonEvolution(evolutionChainUrl!),
    enabled: !!evolutionChainUrl && !!id,
    select: data => parsePokemonEvolution({ data: data.chain, currentPokemonId: id }),
  });

  return { 
    pokemonDetails: pokemonDetailsQuery.data,
    pokemonEvolution: pokemonEvolutionQuery.data ?? [],
    loading: pokemonDetailsQuery.isLoading || pokemonSpeciesQuery.isLoading || pokemonEvolutionQuery.isLoading,
  };
}