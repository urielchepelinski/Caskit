'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Camera, X, RotateCcw, Search } from 'lucide-react'

interface CameraCaptureProps {
  onCapture: (imageData: Blob) => void
  onClose: () => void
  onManualSearch?: () => void
}

export function CameraCapture({ onCapture, onClose, onManualSearch }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const mountedRef = useRef(true)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      if (!mountedRef.current) {
        stream.getTracks().forEach(track => track.stop())
        return
      }
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
        setError(null)
      }
    } catch {
      if (mountedRef.current) {
        setError('Camera access denied. Please allow camera permissions or search manually below.')
      }
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsStreaming(false)
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    startCamera()
    return () => {
      mountedRef.current = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
    }
  }, [startCamera])

  const captureFrame = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0)
    canvas.toBlob((blob) => {
      if (blob) {
        stopCamera()
        onCapture(blob)
      }
    }, 'image/jpeg', 0.85)
  }, [onCapture, stopCamera])

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex justify-between items-center p-4">
        <button onClick={handleClose} className="text-white p-2">
          <X className="w-6 h-6" />
        </button>
        <span className="text-white text-sm font-medium">Scan Bottle</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {!isStreaming && !error && (
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30 animate-pulse">
              <Camera className="w-8 h-8" />
            </div>
            <span className="text-sm">Starting camera...</span>
          </div>
        )}

        {error && (
          <div className="text-center px-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white/50" />
            </div>
            <p className="text-white/70 text-sm mb-6">{error}</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={startCamera}
                className="flex items-center gap-2 text-accent mx-auto px-4 py-2 border border-accent/30 rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                Try again
              </button>
              {onManualSearch && (
                <button
                  onClick={onManualSearch}
                  className="flex items-center gap-2 text-white/80 mx-auto px-4 py-2"
                >
                  <Search className="w-4 h-4" />
                  Search manually
                </button>
              )}
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isStreaming ? 'block' : 'hidden'}`}
        />

        {isStreaming && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-accent/60 rounded-2xl">
              <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-accent rounded-tl-2xl" />
              <div className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-accent rounded-tr-2xl" />
              <div className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-accent rounded-bl-2xl" />
              <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-accent rounded-br-2xl" />
            </div>
            <div className="absolute bottom-24 left-0 right-0 text-center">
              <p className="text-white/80 text-sm">Point at the bottle label</p>
            </div>
          </div>
        )}
      </div>

      {isStreaming && (
        <div className="p-6 pb-8 flex flex-col items-center gap-4">
          <button
            onClick={captureFrame}
            className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg"
            style={{ width: '72px', height: '72px', background: '#C8974C' }}
          >
            <div
              className="rounded-full border-4 border-white/90"
              style={{ width: '60px', height: '60px' }}
            />
          </button>
          {onManualSearch && (
            <button
              onClick={() => { stopCamera(); onManualSearch() }}
              className="flex items-center gap-2 text-white/60 text-sm"
            >
              <Search className="w-3.5 h-3.5" />
              Can&apos;t scan? Search manually
            </button>
          )}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
