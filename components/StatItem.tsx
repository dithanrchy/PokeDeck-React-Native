import React from 'react'
import { StyleSheet } from 'react-native'
import ProgressBar from './ProgressBar'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type Props = {
  label: string
  value: number | null | undefined
}

const StatItem = ({ label, value }: Props) => {
  return (
    <ThemedView key={label} style={styles.statRow}>
      <ThemedText style={styles.statTitle}>
        {label}: {value}
      </ThemedText>
      <ProgressBar progress={value ?? 0} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  statRow: {
    marginBottom: 10,
  },
  statTitle: {
    textTransform: 'capitalize',
  },
})

export default StatItem
