import React, { ReactNode, useEffect } from 'react'
import { X, MinusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CustomAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  trigger?: ReactNode
  title: string
  description: string
  cancelText?: string
  actionText: string
  onAction?: () => void
  actionVariant?: 'default' | 'destructive'
}

const CustomAlertDialog = ({
  isOpen,
  onClose,
  title,
  description,
  cancelText = 'Cancel',
  actionText,
  onAction
}: CustomAlertDialogProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const isAnimating = isOpen

  if (!isOpen) return null

  const handleAction = () => {
    onAction?.()
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ease-out ${
        isAnimating ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-[648px] mx-4 bg-white rounded-[20px] py-6 px-6 shadow-xl transition-all duration-500 ease-out ${
        isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
      }`}>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onClose}
                className="p-0 border-0 bg-transparent hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-medium">{title}</h2>
              <div className="w-5"></div>
            </div>
            <p className="text-base font-normal text-center text-neutral-600">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-3 *:flex-1">
            <Button
              onClick={onClose}
              variant={'outline'}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleAction}
            >
              {actionText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CustomAlertDialog