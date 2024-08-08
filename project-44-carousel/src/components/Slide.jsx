

export default function Slide({ image, alt, isActive }) {
  return (
    <div className={`slide ${isActive ? 'active' : ''}`}>
      <img src={image} alt={alt} title={alt} />
    </div>
  )
}
