import React from "react"
import { ActivityIndicator, FlatList, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { PageContainer, PokemonCard, PokemonsFooter } from "../../src/components"
import { usePokemons } from "../../src/hooks"

export default function Page() {
  const insets = useSafeAreaInsets()
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = usePokemons();

  return (
    <PageContainer title="Pokemons">
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <FlatList
          data={data}
          contentContainerStyle={[styles.contentContainerStyle, {
            paddingBottom: insets.bottom
          }]}
          renderItem={({ item, index }) => (
            <PokemonCard pressable item={item} first={index === 0} />
          )}
          ListFooterComponent={
            <PokemonsFooter
              isHidden={!hasNextPage}
              onPress={fetchNextPage}
              isLoading={isFetchingNextPage}
            />
          }
        />
      )}
    </PageContainer>
  )
}


const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 16,
  }
})
