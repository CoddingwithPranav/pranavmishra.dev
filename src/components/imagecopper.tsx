import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Crop, RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ImageCropperProps {
  value?: string;
  onChange: (file: File | null, preview: string) => void;
  disabled?: boolean;
  label?: string;
  aspectRatio?: number;
  className?: string;
}

export default function ImageCropper({
  value,
  onChange,
  disabled = false,
  label = 'Image',
  aspectRatio = 1,
  className,
}: ImageCropperProps) {
  const [preview, setPreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 300, height: 300 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreview(value || '');
  }, [value]);

  useEffect(() => {
    if (showCropper && imageLoaded && containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height) * 0.7;
      const cropWidth = size;
      const cropHeight = size / aspectRatio;
      
      setCropArea({
        x: (rect.width - cropWidth) / 2,
        y: (rect.height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      });
      setPosition({ x: 0, y: 0 });
    }
  }, [showCropper, imageLoaded, aspectRatio]);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setTempImage(e.target?.result as string);
      setShowCropper(true);
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setImageLoaded(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [disabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setIsDraggingImage(true);
    setDragStart({ 
      x: e.clientX - rect.left - position.x, 
      y: e.clientY - rect.top - position.y 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingImage && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left - dragStart.x,
        y: e.clientY - rect.top - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingImage(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const cropImage = async () => {
    if (!imageRef.current || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    const container = containerRef.current;

    // Set output dimensions to match aspect ratio
    const outputWidth = 800;
    const outputHeight = outputWidth / aspectRatio;
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Create a temporary canvas to handle rotation
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Calculate image display dimensions
    const imgDisplayWidth = img.naturalWidth * zoom;
    const imgDisplayHeight = img.naturalHeight * zoom;

    // Calculate image position in container (center + offset)
    const imgX = containerWidth / 2 + position.x;
    const imgY = containerHeight / 2 + position.y;

    // Calculate crop area bounds in image coordinates
    const cropLeft = cropArea.x;
    const cropTop = cropArea.y;
    const cropRight = cropArea.x + cropArea.width;
    const cropBottom = cropArea.y + cropArea.height;

    // Convert crop area to image space
    const sourceX = (cropLeft - imgX + imgDisplayWidth / 2) / zoom;
    const sourceY = (cropTop - imgY + imgDisplayHeight / 2) / zoom;
    const sourceWidth = cropArea.width / zoom;
    const sourceHeight = cropArea.height / zoom;

    // Handle rotation
    if (rotation !== 0) {
      const angle = (rotation * Math.PI) / 180;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      
      tempCanvas.width = Math.abs(img.naturalWidth * cos) + Math.abs(img.naturalHeight * sin);
      tempCanvas.height = Math.abs(img.naturalWidth * sin) + Math.abs(img.naturalHeight * cos);
      
      tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
      tempCtx.rotate(angle);
      tempCtx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      
      // Draw from rotated temp canvas to final canvas
      ctx.drawImage(
        tempCanvas,
        Math.max(0, sourceX),
        Math.max(0, sourceY),
        Math.min(sourceWidth, tempCanvas.width),
        Math.min(sourceHeight, tempCanvas.height),
        0,
        0,
        outputWidth,
        outputHeight
      );
    } else {
      // No rotation - direct draw
      ctx.drawImage(
        img,
        Math.max(0, Math.min(sourceX, img.naturalWidth)),
        Math.max(0, Math.min(sourceY, img.naturalHeight)),
        Math.max(1, Math.min(sourceWidth, img.naturalWidth - sourceX)),
        Math.max(1, Math.min(sourceHeight, img.naturalHeight - sourceY)),
        0,
        0,
        outputWidth,
        outputHeight
      );
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        const previewUrl = canvas.toDataURL('image/jpeg', 0.95);
        setPreview(previewUrl);
        onChange(file, previewUrl);
        setShowCropper(false);
        setImageLoaded(false);
      }
    }, 'image/jpeg', 0.95);
  };

  const removeImage = () => {
    setPreview('');
    onChange(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="text-foreground font-medium">
          {label}
        </Label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative group transition-all duration-300 rounded-2xl overflow-hidden',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {preview ? (
          <div className="relative w-full aspect-square">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-2xl border border-border shadow-lg"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  className="backdrop-blur-sm bg-white/90 hover:bg-white text-gray-900"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={removeImage}
                  className="backdrop-blur-sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => !disabled && fileInputRef.current?.click()}
            disabled={disabled}
            className={cn(
              'w-full aspect-square border-2 border-dashed rounded-2xl transition-all duration-300',
              'flex flex-col items-center justify-center gap-4 p-8',
              'bg-card backdrop-blur-sm',
              isDragging
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-border hover:border-primary/50 hover:bg-card/80',
              !disabled && 'cursor-pointer'
            )}
          >
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                'bg-primary/10 group-hover:bg-primary/20',
                isDragging && 'scale-110 bg-primary/20'
              )}
            >
              <Upload
                className={cn(
                  'h-8 w-8 text-primary transition-transform duration-300',
                  isDragging && 'scale-110'
                )}
              />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground">
                {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
      </div>

      <Dialog open={showCropper} onOpenChange={setShowCropper}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Crop className="h-6 w-6 text-primary" />
              Crop & Adjust Image
            </DialogTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
              <Move className="h-4 w-4" />
              Drag the image to reposition • Use controls to zoom and rotate
            </p>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            <div
              ref={containerRef}
              className={cn(
                'relative w-full bg-muted rounded-xl overflow-hidden border border-border',
                isDraggingImage ? 'cursor-grabbing' : 'cursor-grab'
              )}
              style={{ height: '500px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {tempImage && (
                <div
                  className="absolute select-none pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  }}
                >
                  <img
                    ref={imageRef}
                    src={tempImage}
                    alt="Crop preview"
                    className="select-none pointer-events-none"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      maxWidth: 'none',
                      maxHeight: 'none',
                      display: 'block',
                    }}
                    onLoad={handleImageLoad}
                    draggable={false}
                  />
                </div>
              )}
              
              {imageLoaded && (
                <>
                  <div 
                    className="absolute inset-0 bg-black/50 pointer-events-none"
                    style={{
                      clipPath: `polygon(
                        0 0, 
                        100% 0, 
                        100% 100%, 
                        0 100%, 
                        0 0,
                        ${cropArea.x}px ${cropArea.y}px,
                        ${cropArea.x}px ${cropArea.y + cropArea.height}px,
                        ${cropArea.x + cropArea.width}px ${cropArea.y + cropArea.height}px,
                        ${cropArea.x + cropArea.width}px ${cropArea.y}px,
                        ${cropArea.x}px ${cropArea.y}px
                      )`
                    }}
                  />
                  
                  <div
                    className="absolute border-2 border-white shadow-lg pointer-events-none"
                    style={{
                      left: `${cropArea.x}px`,
                      top: `${cropArea.y}px`,
                      width: `${cropArea.width}px`,
                      height: `${cropArea.height}px`,
                    }}
                  >
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="border border-white/30" />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <ZoomIn className="h-4 w-4 text-primary" />
                    Zoom: {zoom.toFixed(1)}x
                  </Label>
                </div>
                <Slider
                  value={[zoom]}
                  onValueChange={(value) => setZoom(value[0])}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation((rotation - 90 + 360) % 360)}
                  className="flex-1"
                >
                  <RotateCw className="h-4 w-4 mr-2 scale-x-[-1]" />
                  Rotate Left
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation((rotation + 90) % 360)}
                  className="flex-1"
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Rotate Right
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setZoom(1);
                    setRotation(0);
                    setPosition({ x: 0, y: 0 });
                  }}
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCropper(false);
                    setImageLoaded(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={cropImage}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Crop className="h-4 w-4 mr-2" />
                  Apply Crop
                </Button>
              </div>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </Dialog>
    </div>
  );
}