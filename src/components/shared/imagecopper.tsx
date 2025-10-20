import React, { useState, useRef, useEffect } from 'react'
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Upload, X, Crop as CropIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useDebounceEffect } from './useDebounceEffect'
import { canvasPreview } from './canvasPreview'

interface ImageCropperProps {
  value?: string
  onChange: (file: File | null, preview: string) => void
  disabled?: boolean
  label?: string
  aspectRatio?: number
  className?: string
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  )
}

export default function ImageCropper({
  value,
  onChange,
  disabled = false,
  label = 'Image',
  aspectRatio = 1,
  className,
}: ImageCropperProps) {
  const [preview, setPreview] = useState(value || '')
  const [tempImage, setTempImage] = useState('')
  const [showCropper, setShowCropper] = useState(false)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(aspectRatio)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setPreview(value || '')
  }, [value])

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      setTempImage(reader.result?.toString() || '')
      setShowCropper(true)
      setCrop(undefined)
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const removeImage = () => {
    setPreview('')
    onChange(null, '')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!aspect) return
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, aspect))
  }

  useDebounceEffect(
    () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && canvasRef.current) {
        canvasPreview(imgRef.current, canvasRef.current, completedCrop, scale, rotate)

      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  const applyCrop = async () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const image = imgRef.current
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = completedCrop.width * scaleX
    canvas.height = completedCrop.height * scaleY
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    )

    canvas.toBlob((blob) => {
      if (!blob) return
      const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' })
      const previewUrl = canvas.toDataURL('image/jpeg', 0.95)
      setPreview(previewUrl)
      onChange(file, previewUrl)
      setShowCropper(false)
    }, 'image/jpeg', 0.95)
  }

  const toggleAspect = () => {
    if (aspect) setAspect(undefined)
    else {
      setAspect(aspectRatio)
      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, aspectRatio)
        setCrop(newCrop)
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  return (
    <div className={cn('space-y-2 z-1000', className)}>
      {label && <Label className="text-foreground font-medium">{label}</Label>}

      <div className="relative group rounded-2xl overflow-hidden">
        {preview ? (
          <div className="relative w-full aspect-square">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl border border-border shadow-lg" />
            {!disabled && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center gap-2">
                <Button type="button" size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()} className="backdrop-blur-sm bg-white/90 hover:bg-white text-gray-900">
                  <Upload className="h-4 w-4 mr-2" /> Change
                </Button>
                <Button type="button" size="sm" variant="destructive" onClick={removeImage} className="backdrop-blur-sm">
                  <X className="h-4 w-4 mr-2" /> Remove
                </Button>
              </div>
            )}
          </div>
        ) : (
          <button type="button" onClick={() => !disabled && fileInputRef.current?.click()} disabled={disabled} className={cn('w-full aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 p-8 bg-card', !disabled && 'cursor-pointer')}>
            <Upload className="h-8 w-8 text-primary" />
            <p className="text-sm font-medium text-foreground">Click to upload</p>
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
      </div>

      <Dialog open={showCropper} onOpenChange={setShowCropper}>
        <DialogContent className="max-w-4xl p-4 bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <CropIcon className="h-6 w-6 text-primary" /> Crop & Adjust
            </DialogTitle>
          </DialogHeader>

          {tempImage && (
            <>
              <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={setCompletedCrop} aspect={aspect}>
                <img ref={imgRef} src={tempImage} alt="To crop" style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }} onLoad={onImageLoad} />
              </ReactCrop>

              <div className="mt-4 flex flex-col gap-2">
                <div>
                  <label>Scale: </label>
                  <input type="number" step="0.1" value={scale} onChange={(e) => setScale(Number(e.target.value))} />
                </div>
                <div>
                  <label>Rotate: </label>
                  <input type="number" value={rotate} onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))} />
                </div>
                <Button type="button" onClick={toggleAspect}>Toggle Aspect Ratio</Button>
                <Button type="button" onClick={applyCrop} className="bg-primary text-white">Apply Crop</Button>
              </div>

              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
