import PropTypes from "prop-types"

export default function Gallery({ photos, setPhoto }) {
  return (
    <>
      <div className="flex justify-center items-center gap-4 m-4 flex-wrap">
        {photos.length === 0 && <p className="text-center">Nenhuma imagem encontrada</p>}
        {photos.length > 0 && photos.map((item) => (
          <img
            key={item.id}
            src={item.urls.regular}
            alt={item.alt_description}
            className="w-24 h-24 rounded cursor-pointer"
            title="Clique para ampliar a foto"
            onClick={() => setPhoto(item)}
          />
        ))}
      </div>
    </>
  )
}

Gallery.propTypes = {
  photos: PropTypes.array,
  photo: PropTypes.object,
  setPhoto: PropTypes.func
}
