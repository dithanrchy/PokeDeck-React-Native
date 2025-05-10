import LoadingIndicator from '@/components/LoadingIndicator'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { GET_POKEMON_TYPES } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

const FilterScreen = () => {
  const { data, loading, error } = useQuery(GET_POKEMON_TYPES)
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const handleApplyFilter = () => {
    if (selectedType) {
      router.replace({
        pathname: '/', // Keep the current path
        params: {
          filter: JSON.stringify({ type: selectedType }), // Update the params
        },
      })
    }
  }

  if (loading) return <LoadingIndicator />
  if (error) return <ThemedText>Error fetching types!</ThemedText>

  const pokemonTypes = data?.pokemon_v2_type ?? []

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Filter</ThemedText>
      <ThemedText style={styles.subTitle}>Type</ThemedText>
      <DropDownPicker
        open={open}
        value={selectedType}
        items={pokemonTypes.map((type: { name: any }) => ({
          label: type.name,
          value: type.name,
        }))}
        setOpen={setOpen}
        setValue={setSelectedType}
        placeholder="Select a type"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
      />

      <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
        <ThemedText style={styles.applyButtonText}>Apply Filter</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default FilterScreen
