import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedView } from './ThemedView'

type ProgressBarProps = {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const primaryRed = useThemeColor({}, 'primary')

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.progressBarBackground}>
        <ThemedView style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: primaryRed }]} />
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0df',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
})

export default ProgressBar
