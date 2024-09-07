import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, SectionList, ActivityIndicator } from "react-native";
import { usePokemonDetails } from "../../../src/hooks";
import { PageContainer, PokemonBadge, PokemonCard } from "../../../src/components";
import { useMemo } from "react";
import { Pokemon } from "../../../src/models";
import { capitalize } from "../../../src/utils";

enum SectionKeys {
  firstFiveMoves = 'firstFiveMoves',
  evolutions = 'evolutions'
}

type SectionListRenderItem = {
  item: Pokemon,
  section: { key: SectionKeys, title: string, data: Pokemon[] }
}

type SectionListRenderSectionHeader = {
  section: { title: string }
}

export default function Page() {
  const { id } = useLocalSearchParams();
  const { pokemonDetails, pokemonEvolution, loading } = usePokemonDetails(String(id));

  const firstFiveMoves = useMemo(() => ( 
    pokemonDetails?.moves.slice(0, 5).map(el => el.move) ?? []
  ), [pokemonDetails]);

  const sections = useMemo(() => ([
    {
      key: SectionKeys.firstFiveMoves,
      title: 'First 5 moves',
      data: firstFiveMoves
    },
    {
      key: SectionKeys.evolutions,
      title: 'Evolutions',
      data: pokemonEvolution as Pokemon[]
    }
  ]), [firstFiveMoves, pokemonEvolution]);

  const renderItem = ({ item, section }: SectionListRenderItem) => (
    <PokemonCard 
      pressable={section.key === SectionKeys.evolutions} 
      item={item} 
    />
  )

  const renderSectionHeader = ({ section: { title } }: SectionListRenderSectionHeader) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  )

  return (
    <PageContainer 
      scrollable 
      title={capitalize(pokemonDetails?.name ?? '')} 
      imageURI={pokemonDetails?.sprites.front_default}
    >
      {loading 
        ? <ActivityIndicator />
        : (
          <View style={styles.container}>
            <View style={styles.typesRow}>
              {pokemonDetails?.types.map(({type, slot}) => (
                <PokemonBadge key={slot} type={type} />
              ))}
            </View>
            <SectionList 
              scrollEnabled={false}
              sections={sections}
              keyExtractor={(item, index) => item.name + index}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
            />
          </View>
        )
      }
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  typesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  sectionSeparator: {
    height: 8,
  },
})