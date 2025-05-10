import { Link } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import PokemonHeader from './PokemonHeader'
import { ThemedText } from './ThemedText'

type PokemonCardProps = {
  id: number
  name: string
  types: string[]
  imageUrl?: string
}

const PokemonCard = ({ id, name, types, imageUrl }: PokemonCardProps) => {
  return (
    <Link href={`/pokemon/${id}`} asChild>
      <Pressable style={styles.card}>
        <PokemonHeader id={id || 0} />

        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <ThemedText>No image</ThemedText>
        )}
        <ThemedText style={styles.name} darkColor="#1a1a1a">
          {name}
        </ThemedText>
        <ThemedText style={styles.types}>{types.join(' / ')}</ThemedText>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  types: {
    fontSize: 12,
    color: '#555',
  },
})

export default PokemonCard
