import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { IconSymbol } from './ui/IconSymbol'

interface ChipFilterProps {
  label: string
  onClear: () => void
}

const ChipFilter: React.FC<ChipFilterProps> = ({ label, onClear }) => {
  const theme = useColorScheme() ?? 'light'

  return (
    <ThemedView
      style={styles.chipContainer}
      lightColor={Colors.light.secondaryButton}
      darkColor={Colors.dark.secondaryButton}
    >
      <ThemedText style={styles.chipText}>Active Filter: {label}</ThemedText>
      <TouchableOpacity onPress={onClear}>
        <IconSymbol
          size={18}
          name="x.circle"
          color={theme === 'light' ? Colors.light.primary : Colors.dark.primary}
        />
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  chipContainer: {
    // backgroundColor: '#e0f0ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 10,
  },
})

export default ChipFilter
