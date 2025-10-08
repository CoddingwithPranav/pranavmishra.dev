import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Crop, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Update preview when value prop changes (for loaded data from API)
  useEffect(() => {
    setPreview(value || '');
  }, [value]);

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
    setIsDraggingImage(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingImage) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingImage(false);
  };

  const cropImage = async () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    const size = 400;
    canvas.width = size;
    canvas.height = size / aspectRatio;

    ctx.fillStyle = 'var(--background)';
    ctx.fillRect(0, 0, size, size / aspectRatio);

    ctx.save();
    ctx.translate(size / 2, (size / aspectRatio) / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(-size / 2, -(size / aspectRatio) / 2);
    ctx.drawImage(
      img,
      position.x + size / 2 - (img.width * zoom) / 2,
      position.y + (size / aspectRatio) / 2 - (img.height * zoom) / 2,
      img.width,
      img.height
    );
    ctx.restore();

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        const previewUrl = canvas.toDataURL('image/jpeg', 0.9);
        setPreview(previewUrl);
        onChange(file, previewUrl);
        setShowCropper(false);
      }
    }, 'image/jpeg', 0.9);
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
        <Label className="text-foreground font-medium dark:text-foreground">
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
          <div className={cn('relative w-full aspect-square ')}>
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
                  className="backdrop-blur-sm bg-destructive/80 hover:bg-destructive"
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
              <p className="text-sm font-medium text-foreground dark:text-foreground">
                {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">
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
        <DialogContent
          className={cn(
            'max-w-2xl p-0 overflow-hidden bg-card border-border shadow-lg',
            'backdrop-blur-sm rounded-2xl'
          )}
        >
          <DialogHeader className="px-6 pt-6">
            <DialogTitle
              className={cn(
                'text-2xl font-bold text-foreground dark:text-foreground flex items-center gap-2'
              )}
            >
              <Crop className="h-6 w-6 text-primary" />
              Crop Image
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            <div
              className={cn(
                'relative w-full aspect-square bg-muted rounded-2xl overflow-hidden cursor-move',
                'border border-border'
              )}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                ref={imageRef}
                src={tempImage}
                alt="Crop preview"
                className="absolute inset-0 w-full h-full object-contain select-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                  transformOrigin: 'center',
                }}
                draggable={false}
              />
              <div
                className="absolute inset-0 border-2 border-primary/50 rounded-2xl pointer-events-none"
                style={{ borderColor: 'var(--primary)' }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="flex-1 bg-card hover:bg-card/80 border-border text-foreground"
                >
                  <ZoomOut className="h-4 w-4 mr-2 text-primary" />
                  Zoom Out
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                  className="flex-1 bg-card hover:bg-card/80 border-border text-foreground"
                >
                  <ZoomIn className="h-4 w-4 mr-2 text-primary" />
                  Zoom In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation((rotation + 90) % 360)}
                  className="flex-1 bg-card hover:bg-card/80 border-border text-foreground"
                >
                  <RotateCw className="h-4 w-4 mr-2 text-primary" />
                  Rotate
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCropper(false)}
                  className="flex-1 bg-card hover:bg-card/80 border-border text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={cropImage}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
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