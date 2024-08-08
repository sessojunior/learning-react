import { useEffect, useState } from "react"

import Indicators from "./Indicators"
import Slide from "./Slide"

export default function Carousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const previousSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  }

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide, images.length]);

  return (
    <div className="carousel">
      <div className="slides">
        {images.map((image, index) => (
          <Slide key={index} image={image} isActive={index === currentSlide} alt={`Slide ${index + 1}`} />
        ))}
        <Indicators totalSlides={images.length} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        <div className="buttons">
          <button onClick={previousSlide}>Anterior</button>
          <button onClick={nextSlide}>Próximo</button>
        </div>
      </div>
    </div>
  )
}
