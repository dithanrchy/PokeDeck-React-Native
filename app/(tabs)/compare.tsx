import LoadingIndicator from '@/components/LoadingIndicator'
import PokemonStatsCard from '@/components/PokemonStatsCard'
import { RoundedButton } from '@/components/RoundedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { GET_POKEMON_DETAIL, GET_POKEMON_DROPDOWN } from '@/graphql/queries'
import { normalizePokemon } from '@/utils/normalizePokemon'
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function PokemonComparisonScreen() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [poke1, setPoke1] = useState(null)
  const [poke2, setPoke2] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const {
    data: dropdownData,
    loading: loadingDropdown,
    error: errorDropdown,
  } = useQuery(GET_POKEMON_DROPDOWN)

  const { data: data1 } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: poke1 },
    skip: !poke1,
  })

  const { data: data2 } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: poke2 },
    skip: !poke2,
  })

  const items =
    dropdownData?.pokemon_v2_pokemon?.map(({ id, name }: { id: number; name: string }) => ({
      label: name,
      value: id,
    })) || []

  const poke1Data = data1 ? normalizePokemon(data1.pokemon_v2_pokemon_by_pk) : null
  const poke2Data = data2 ? normalizePokemon(data2.pokemon_v2_pokemon_by_pk) : null

  const handleCompare = () => {
    setShowResult(true)
  }

  if (loadingDropdown) {
    return <LoadingIndicator />
  }

  if (errorDropdown) {
    return <ThemedText style={styles.errorText}>Error fetching Pokémon list!</ThemedText>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.appTitle}>Compare Pokémon</ThemedText>
        <ThemedView style={{ flexDirection: 'row', gap: 8 }}>
          <ThemedView style={{ width: '50%' }}>
            <DropDownPicker
              open={open1}
              value={poke1}
              items={items}
              setOpen={setOpen1}
              setValue={setPoke1}
              setItems={() => {}}
              placeholder="Select a Pokémon"
              searchable
              searchPlaceholder="Search Pokémon..."
            />
          </ThemedView>
          <ThemedView style={{ width: '50%' }}>
            <DropDownPicker
              open={open2}
              value={poke2}
              items={items}
              setOpen={setOpen2}
              setValue={setPoke2}
              setItems={() => {}}
              placeholder="Select a Pokémon"
              searchable
              searchPlaceholder="Search Pokémon..."
            />
          </ThemedView>
        </ThemedView>

        <RoundedButton
          title="Compare"
          onPress={handleCompare}
          disabled={!poke1 || !poke2}
          style={styles.btnStyle}
        />

        {showResult && poke1Data && poke2Data && (
          <ThemedView style={styles.compareContainer}>
            <PokemonStatsCard data={poke1Data} />
            <PokemonStatsCard data={poke2Data} />
          </ThemedView>
        )}
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appTitle: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  compareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 8,
  },
  btnStyle: {
    marginVertical: 16,
  },
})
