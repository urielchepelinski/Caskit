'use client'

import { useState, useCallback, useRef } from 'react'

interface OcrResult {
  text: string
  confidence: number
}

/**
 * Client-side OCR using Tesseract.js.
 * Runs entirely in the browser — no API cost.
 * Loads the WASM worker on first use (~2MB download, cached after).
 */
export function useOcr() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const workerRef = useRef<any>(null)

  const recognize = useCallback(async (imageBlob: Blob): Promise<OcrResult | null> => {
    setLoading(true)
    setProgress(0)

    try {
      // Dynamic import to avoid bundling Tesseract in the main chunk
      // @ts-ignore — resolved at runtime after npm install
      const Tesseract = await import(/* webpackIgnore: true */ 'tesseract.js')

      const result = await Tesseract.recognize(imageBlob, 'eng', {
        logger: (info: any) => {
          if (info.status === 'recognizing text') {
            setProgress(Math.round(info.progress * 100))
          }
        },
      })

      const text = result.data.text.trim()
      const confidence = result.data.confidence / 100

      return text.length > 2 ? { text, confidence } : null
    } catch (err) {
      console.error('OCR failed:', err)
      return null
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }, [])

  return { recognize, loading, progress }
}
