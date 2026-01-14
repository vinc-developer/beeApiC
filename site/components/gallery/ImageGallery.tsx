'use client';

import { useState } from 'react';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <>
      <div
        className={styles.gallery}
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(250px, 1fr))`
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.galleryItem}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={styles.galleryImage}
            />
            <div className={styles.galleryOverlay}>
              <span className={styles.zoomIcon}>🔍</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <button
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            ✕
          </button>

          {selectedImage > 0 && (
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Image précédente"
            >
              ‹
            </button>
          )}

          {selectedImage < images.length - 1 && (
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Image suivante"
            >
              ›
            </button>
          )}

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCaption}>
              {images[selectedImage].alt}
            </div>
            <div className={styles.lightboxCounter}>
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

