import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PokemonType } from '../../models';
import { pokemonColors } from '../../utils';

interface PokemonBadgeProps {
  type: PokemonType['type'];
}

export const PokemonBadge = ({ type }: PokemonBadgeProps) => (
  <View style={[styles.container, {backgroundColor: pokemonColors[type.name]}]}>
    <Text style={styles.title}>{type.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderRadius: 2,
  },
  title: {
    color: 'white',
  }
})
