import React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type Props = {
  label: string
  value: string | null | undefined
}

const InfoRow = ({ label, value }: Props) => (
  <ThemedView style={styles.infoRow}>
    <ThemedView style={styles.infoRowInner}>
      <ThemedText style={styles.infoLabel}>{label}</ThemedText>
      <ThemedText style={styles.infoValue}>{value ?? '-'}</ThemedText>
    </ThemedView>
  </ThemedView>
)

const styles = StyleSheet.create({
  infoRow: {
    paddingVertical: 4,
  },
  infoRowInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontWeight: 'semibold',
    width: 150,
  },
  infoValue: {
    flex: 1,
    flexWrap: 'wrap',
  },
})

export default InfoRow
