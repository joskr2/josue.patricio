import { useEffect, useState } from 'react'

interface UseTypewriterProps {
  text: string
  speed?: number
  delay?: number
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
}: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [started, setStarted] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally resets the typewriter state when `text` changes; `text` is the re-run trigger, not a value read inside the body.
  useEffect(() => {
    // Reset state when text changes
    // biome-ignore lint/nursery/useReactCompiler: the typewriter's timer-driven output must be cleared after commit when `text` changes; clearing it during render would desync the pending timeout chain.
    setDisplayText('')
    setCurrentIndex(0)
    setIsComplete(false)
    setStarted(false)
  }, [text])

  useEffect(() => {
    if (!started) {
      const delayTimeout = setTimeout(() => {
        setStarted(true)
      }, delay)
      return () => clearTimeout(delayTimeout)
    }

    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex >= text.length) {
      // biome-ignore lint/nursery/useReactCompiler: completion is only knowable once the typing timeout has advanced `currentIndex` to the end of `text`, so it cannot be derived during render.
      setIsComplete(true)
    }
  }, [currentIndex, text, speed, delay, started])

  return { displayText, isComplete }
}
