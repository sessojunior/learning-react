import PropTypes from "prop-types"

export default function Photo({ photo, setPhoto }) {
  return (
    <div className={!photo ? "hidden" : "absolute top-0 left-0 margin-x-auto flex justify-center items-center w-full h-full bg-opacity-75 bg-black"} onClick={() => setPhoto(null)} title="Clique para fechar a foto">
      <div className="flex justify-center w-96 max-h-96 bg-blue-300 rounded">
        {photo && (
          <img
            src={photo.urls.regular}
            alt={photo.alt_description}
            className="w-full h-auto rounded cursor-pointer"
            title="Clique para fechar a foto"
            onClick={() => setPhoto(null)}
          />
      )}
      </div>
    </div>
  )
}

Photo.propTypes = {
  photo: PropTypes.object,
  setPhoto: PropTypes.func
}
