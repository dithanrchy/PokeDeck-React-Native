import { useThemeColor } from '@/hooks/useThemeColor'
import { NormalizedPokemon } from '@/types/pokemon'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type PokemonStatsCardProps = {
  data: NormalizedPokemon
}

const PokemonStatsCard = ({ data }: PokemonStatsCardProps) => {
  const backgroundColor = useThemeColor({}, 'containerColor')
  const { name, imageUrl, height, weight, abilities, catchRate, growthRate, stats } = data

  return (
    <ThemedView style={[styles.pokemonContainer, { backgroundColor }]}>
      <ThemedText style={styles.name}>{name}</ThemedText>

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <ThemedText>No image</ThemedText>
      )}

      <ThemedText style={styles.stat}>Height: {height} cm</ThemedText>
      <ThemedText style={styles.stat}>Weight: {weight} kg</ThemedText>
      <ThemedText style={styles.stat}>Abilities: {abilities}</ThemedText>
      <ThemedText style={styles.stat}>Catch Rate: {catchRate}</ThemedText>
      <ThemedText style={styles.stat}>Growth Rate: {growthRate}</ThemedText>

      <ThemedText style={styles.sectionTitle}>Stats</ThemedText>
      {stats.map((s, i) => (
        <ThemedText key={i} style={styles.stat}>
          {s.name}: {s.value}
        </ThemedText>
      ))}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  pokemonContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    marginVertical: 8,
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 12,
    alignSelf: 'center',
  },
  stat: {
    fontSize: 14,
  },
})

export default PokemonStatsCard
