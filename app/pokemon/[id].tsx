import { useQuery } from '@apollo/client'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'
import { GET_POKEMON_DETAIL } from '../../graphql/queries'

import InfoRow from '@/components/InfoRow'
import LoadingIndicator from '@/components/LoadingIndicator'
import PokemonHeader from '@/components/PokemonHeader'
import StatItem from '@/components/StatItem'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { formatString } from '@/utils/function'
import { normalizePokemon } from '@/utils/normalizePokemon'

export default function PokemonDetail() {
  const { id } = useLocalSearchParams()
  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id },
  })

  if (loading) return <LoadingIndicator />

  const rawPokemon = data?.pokemon_v2_pokemon_by_pk

  if (error || !rawPokemon) return <Text>Error loading data</Text>

  const pokemon = normalizePokemon(rawPokemon)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PokemonHeader id={pokemon?.id || 0} />
      <ThemedText style={styles.titleName}>{pokemon?.name}</ThemedText>
      {pokemon?.imageUrl ? (
        <Image source={{ uri: pokemon?.imageUrl }} style={styles.image} resizeMode="contain" />
      ) : (
        <ThemedText>No image</ThemedText>
      )}

      {/* Profile Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Profile</ThemedText>
        <InfoRow label="Approx. Height: " value={`${pokemon?.height} cm`} />
        <InfoRow label="Approx. Weight: " value={`${pokemon?.weight} kg`} />
        <InfoRow label="Catch Rate: " value={`${pokemon?.catchRate}%`} />
        <InfoRow label="Growth Rate: " value={pokemon?.growthRate} />
        <InfoRow label="Effort Values: " value={pokemon?.effortValues} />
        <InfoRow label="Abilities: " value={pokemon?.abilities} />
        <InfoRow label="Hatch Steps" value={String(pokemon?.hatchSteps)} />
      </ThemedView>

      {/* Stats Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Stats</ThemedText>
        {pokemon?.stats.map((stat: any) => (
          <StatItem key={stat.name} label={formatString(stat.name)} value={stat.value} />
        ))}
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  section: {
    padding: 16,
  },
  titleName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  statRow: {
    marginBottom: 10,
  },
  statTitle: {
    textTransform: 'capitalize',
  },
  statLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontWeight: '600',
  },
  bar: {
    height: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontWeight: '500',
  },
  infoValue: {
    fontWeight: '400',
  },
})
