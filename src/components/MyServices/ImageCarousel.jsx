import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState({});

  // Reset index if images change
  useEffect(() => {
    if (images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goToPrevious = () => {
    if (images.length === 0) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (images.length === 0) return;
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleImageError = (index) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  // Return placeholder if no images
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-64 md:h-96"
      role="region"
      aria-label="Image carousel"
    >
      {imageError[currentIndex] ? (
        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Failed to load image</p>
        </div>
      ) : (
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1} of ${images.length}`}
          className="w-full h-full object-cover rounded-lg"
          onError={() => handleImageError(currentIndex)}
        />
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Image counter */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Clickable dots navigation */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-gray-300 hover:bg-gray-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
