import LoadingIndicator from '@/components/LoadingIndicator'
import PokemonCard from '@/components/PokemonCard'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { GET_POKEMON_LIST } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

const PAGE_SIZE = 20

export default function PokemonList() {
  const [, setOffset] = useState(0)

  const { data, loading, error, fetchMore } = useQuery(GET_POKEMON_LIST, {
    variables: { limit: PAGE_SIZE, offset: 0 },
  })

  const pokemonList = data?.pokemon_v2_pokemon ?? []

  const handleLoadMore = () => {
    if (loading || !data) return

    fetchMore({
      variables: {
        offset: pokemonList.length,
        limit: PAGE_SIZE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return {
          ...prev,
          pokemon_v2_pokemon: [...prev.pokemon_v2_pokemon, ...fetchMoreResult.pokemon_v2_pokemon],
        }
      },
    })

    setOffset(pokemonList.length)
  }

  const renderItem = ({ item }: any) => {
    const imageUrl = item.pokemon_v2_pokemonsprites?.[0]?.sprites
    const types = item.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name)

    return <PokemonCard id={item.id} name={item.name} types={types} imageUrl={imageUrl} />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView>
        <FlatList
          data={pokemonList}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{
            ...styles.container,
            paddingBottom: 100,
            paddingTop: 10,
          }}
          renderItem={renderItem}
          ListHeaderComponent={() => <ThemedText style={styles.appTitle}>Pokémon</ThemedText>}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <LoadingIndicator /> : null}
        />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appTitle: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
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
