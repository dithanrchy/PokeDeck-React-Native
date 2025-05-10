import LoadingIndicator from '@/components/LoadingIndicator'
import PokemonCard from '@/components/PokemonCard'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { GET_POKEMON_LIST } from '@/graphql/queries'
import { RawPokemon } from '@/types/pokemon'
import useDebounce from '@/utils/useDebounce'
import { useLazyQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'

const PAGE_SIZE = 20

export default function PokemonList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const [fetchPokemon, { loading, data, fetchMore }] = useLazyQuery(GET_POKEMON_LIST)

  useEffect(() => {
    fetchPokemon({
      variables: {
        limit: PAGE_SIZE,
        offset: 0,
        where: {},
      },
    })
    setHasMounted(true)
  }, [])

  useDebounce(
    searchTerm,
    value => {
      if (!hasMounted) return

      fetchPokemon({
        variables: {
          limit: PAGE_SIZE,
          offset: 0,
          where: value.trim().length > 0 ? { name: { _ilike: `%${value.toLowerCase()}%` } } : {},
        },
      })
    },
    500
  )

  const handleLoadMore = () => {
    if (loading || isLoadingMore || !data?.pokemon_v2_pokemon?.length) return

    setIsLoadingMore(true)

    fetchMore({
      variables: {
        offset: data.pokemon_v2_pokemon.length,
        limit: PAGE_SIZE,
        where:
          searchTerm.trim().length > 0 ? { name: { _ilike: `%${searchTerm.toLowerCase()}%` } } : {},
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setIsLoadingMore(false)
        if (!fetchMoreResult) return prev

        const all = [...prev.pokemon_v2_pokemon, ...fetchMoreResult.pokemon_v2_pokemon]
        const unique = Array.from(new Map(all.map(p => [p.id, p])).values())

        return {
          ...prev,
          pokemon_v2_pokemon: unique,
        }
      },
    }).catch(() => {
      setIsLoadingMore(false)
    })
  }

  const renderItem = useCallback(({ item }: { item: RawPokemon }) => {
    const imageUrl = item.pokemon_v2_pokemonsprites?.[0]?.sprites
    const types = item.pokemon_v2_pokemontypes.map(t => t.pokemon_v2_type.name)

    return <PokemonCard id={item.id} name={item.name} types={types} imageUrl={imageUrl} />
  }, [])

  const pokemonList = data?.pokemon_v2_pokemon ?? []
  const isSearching = searchTerm.trim().length > 0
  const noResults = !loading && isSearching && pokemonList.length === 0

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.appTitle}>Pokémon</ThemedText>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#999"
          />
        </View>

        {/* Loading state */}
        {loading && pokemonList.length === 0 && (
          <View style={styles.centerContent}>
            <LoadingIndicator />
          </View>
        )}

        {/* No results */}
        {noResults && (
          <ThemedText style={styles.noResults}>No Pokemon found matching "{searchTerm}"</ThemedText>
        )}

        {/* Pokemon list */}
        <FlatList
          data={pokemonList}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 10,
          }}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            (loading && pokemonList.length > 0) || isLoadingMore ? <LoadingIndicator /> : null
          }
        />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  searchContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
})
