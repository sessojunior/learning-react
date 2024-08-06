

export default function ImageUpload({ setImage }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)
    
    reader.onload = () => {
      setImage(reader.result)
    }
  }

  return (
    <div className="flex flex-col pb-4">
      <label htmlFor="image" className="font-bold pb-2">Imagem para upload</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} id="image" />
    </div>
  )
}
