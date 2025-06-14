import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { ThemedView } from './ThemedView'

type RoundedButtonProps = {
  title: string
  onPress: () => void
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  containerStyle?: ViewStyle
}

export const RoundedButton = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  containerStyle,
}: RoundedButtonProps) => {
  const activeColor = useThemeColor({}, 'primaryButton')
  const disabledColor = useThemeColor({}, 'disabledButton')

  return (
    <ThemedView style={containerStyle}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: disabled ? disabledColor : activeColor,
            opacity: pressed && !disabled ? 0.85 : 1,
          },
          style,
        ]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
