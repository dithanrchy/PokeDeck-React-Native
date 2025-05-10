import { POKEBALL_IMAGE } from '@/assets/images'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type PokemonHeaderProps = {
  id: number
}

const PokemonHeader = ({ id }: PokemonHeaderProps) => {
  return (
    <ThemedView style={styles.cardHeader}>
      <Image source={POKEBALL_IMAGE} style={styles.pokeballImage} />
      <ThemedText style={styles.id}>{`#${id}`}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    padding: 8,
    gap: 4,
  },
  pokeballImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  id: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default PokemonHeader
