import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

const getStorageValue = (key: string, defaultValue: any) => {
  const saved = localStorage.getItem(key) || JSON.stringify(defaultValue)
  const initial = JSON.parse(saved)
  return initial
}

export const getValueFromLS = (key: string) => {
  const value = localStorage.getItem(key)
  if (!value) return null
  return JSON.parse(value)
}
export const setValueToLS = (key: string, val: object) => {
  const storedValue = localStorage.getItem(key) || '{}'
  const parsedValue = JSON.parse(storedValue)

  localStorage.setItem(key, JSON.stringify({ ...parsedValue, ...val }))
}

const useLocalStorage = <T,>(
  key: string,
  defaultValue: any,
): [T, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState(() =>
    getStorageValue(key, defaultValue),
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
