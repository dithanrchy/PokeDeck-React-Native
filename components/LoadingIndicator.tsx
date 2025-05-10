import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { ThemedView } from './ThemedView'

type LoadingIndicatorProps = {
  size?: number | 'small' | 'large'
  color?: string
}

const LoadingIndicator = ({ size = 'large', color = '#999' }: LoadingIndicatorProps) => {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </ThemedView>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
