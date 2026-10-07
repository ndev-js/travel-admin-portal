import { useEffect, type RefObject } from 'react'

/** Focuses an input when `key` is pressed outside of any text field (the "F" / "/" hints in the UI). */
export function useFocusHotkey(key: string, ref: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== key || e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return

      const el = ref.current
      if (!el) return
      // Skip when the input is off-screen (e.g. the mobile drawer is closed)
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.right <= 0) return

      e.preventDefault()
      el.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key, ref])
}
