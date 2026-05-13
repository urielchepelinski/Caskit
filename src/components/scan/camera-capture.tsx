'use client'

import { useRef, useState, useCallback } from 'react'
import { Camera, X, RotateCcw } from 'lucide-react'

interface CameraCaptureProps {
  onCapture: (imageData: Blob) => void
  onClose: () => void
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
        setError(null)
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.')
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsStreaming(false)
    }
  }, [])

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
          <button
            onClick={startCamera}
            className="flex flex-col items-center gap-4 text-white"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
              <Camera className="w-8 h-8" />
            </div>
            <span className="text-sm">Tap to open camera</span>
          </button>
        )}

        {error && (
          <div className="text-center px-8">
            <p className="text-white/70 text-sm mb-4">{error}</p>
            <button
              onClick={startCamera}
              className="flex items-center gap-2 text-accent mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Try again
            </button>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-white/40 rounded-2xl" />
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white/80 text-sm">Point at the label</p>
            </div>
          </div>
        )}
      </div>

      {isStreaming && (
        <div className="p-6 flex justify-center">
          <button
            onClick={captureFrame}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
          >
            <div className="w-14 h-14 rounded-full border-4 border-text-primary" />
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
