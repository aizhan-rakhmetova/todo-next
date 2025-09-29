import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/utils';
import { Button } from './Button';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div
        className={cn(
          'relative w-full max-w-lg mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 animate-fade-in',
          'transform transition-all duration-300 ease-out',
          className
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900 text-gradient">{title}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 bg-white/80">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
