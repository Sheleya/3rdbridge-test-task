import { useInfiniteQuery } from "@tanstack/react-query"
import { PokemonService } from "../services"

const PAGE_SIZE = 20;

export const usePokemons = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['pokemons'],
      queryFn: ({ pageParam }) => PokemonService.getPokemons({
        limit: PAGE_SIZE,
        offset: pageParam
      }),
      initialPageParam: 0,
      getNextPageParam: (_, allPages) => allPages.length * PAGE_SIZE
    })

  return {
    data: data?.pages.flat(),
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  }
}