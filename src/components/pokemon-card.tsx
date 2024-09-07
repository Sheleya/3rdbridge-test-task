import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { Pokemon } from "../models"
import { Colors, getIdFromUrl } from "../utils"
import { Link } from "expo-router"

interface PokemonCardProps {
  item: Pokemon;
  first?: boolean;
  pressable?: boolean;
}

function CardContent({ item }: PokemonCardProps) {
  return (
    <View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.url}>{item.url}</Text>
    </View>
  )
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ item, first = false, pressable = false }) => {
  const pokemonId = getIdFromUrl(item.url);

  return (
    <View style={[styles.card, first && styles.first]}> 
      {pressable ? 
          <Link href={`/pages/pokemon-details/${pokemonId}`}> 
            <CardContent item={item} />
          </Link> 
        : <CardContent item={item} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    marginTop: 8,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 8
  },
  first: {
    marginTop: 0
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  url: {
    fontSize: 12,
    color: Colors.GRAY,
    marginTop: 4
  }
})
