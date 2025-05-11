import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { GET_POKEMON_TYPES } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Switch, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function FilterScreen() {
  const router = useRouter()

  const { data } = useQuery(GET_POKEMON_TYPES)
  const typeOptions =
    data?.pokemon_v2_type.map((t: any) => ({
      label: t.name,
      value: t.name,
    })) || []

  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleApplyFilter = () => {
    router.replace({
      pathname: '/',
      params: {
        filter: JSON.stringify({
          type: selectedType,
          sort: sortOrder,
        }),
      },
    })
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Sort by Id</ThemedText>
      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <ThemedText style={{ marginRight: 10 }}>Sort Descending</ThemedText>
        <Switch
          value={sortOrder === 'desc'}
          onValueChange={value => setSortOrder(value ? 'desc' : 'asc')}
        />
      </ThemedView>

      <ThemedText style={styles.label}>Filter by Type</ThemedText>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={typeOptions}
        value={selectedType}
        setValue={setSelectedType}
        placeholder="Select Type"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdown}
      />

      <TouchableOpacity onPress={handleApplyFilter} style={styles.button}>
        <ThemedText style={styles.buttonText}>Apply Filter</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  dropdown: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})
