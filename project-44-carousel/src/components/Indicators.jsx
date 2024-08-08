

export default function Indicators({ totalSlides, currentSlide, setCurrentSlide }) {
  return (
    <div className="indicators">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`indicator ${index === currentSlide ? 'active' : ''}`}
          onClick={() => setCurrentSlide(index)}
        />
      ))}
    </div>
  )
}
