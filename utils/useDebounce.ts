import { useEffect, useState } from 'react'

export default function useDebounce<T>(
  value: T,
  onFinish?: (value: T) => Promise<void> | void,
  delay?: number
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
      onFinish?.(value)
    }, delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
