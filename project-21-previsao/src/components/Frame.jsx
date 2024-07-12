import { FaRegRectangleList, FaChevronLeft, FaPlay, FaChevronRight, FaClock } from "react-icons/fa6"
import { useState } from 'react'
import PropTypes from 'prop-types'

const TopFrame = ({ frames, id, values }) => {

  const classButton = "size-9 md:size-[38px] inline-flex justify-center items-center gap-2 rounded-md font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-50 text-xs md:text-sm"

  const classButtonTime = "size-9 md:size-[38px] inline-flex justify-center items-center gap-2 rounded-md font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-50 text-xs md:text-sm"

  const classButtonTimeActive = "size-9 md:size-[38px] inline-flex justify-center items-center gap-2 rounded-md font-medium bg-gray-100 border border-gray-200 text-gray-700 focus:outline-none focus:bg-gray-50 text-xs md:text-sm"

  const [openDropdownConfig, setOpenDropdownConfig] = useState(false)
  const [openDropdownTime, setOpenDropdownTime] = useState(false)

  const handleDropdownConfig = () => {
    setOpenDropdownConfig(!openDropdownConfig)
  }

  const handleDropdownTime = () => {
    setOpenDropdownTime(!openDropdownTime)
  }

  const [frame, setFrame] = useState(frames.find(frame => frame.id === id))

  console.log("frames", frames)
  console.log("values", values)
  console.log("values.model", values.model)
  console.log("id", id)
  console.log("frame", frame)

  return (
    <div className="flex justify-between">
      <div className="flex relative">
        <button className={classButton} onClick={handleDropdownConfig}><FaRegRectangleList /></button>
        {openDropdownConfig && (
          <form>
            <div className="absolute top-12 left-0 bg-gray-100 border border-gray-200 rounded-md p-4">
              <div className="border-b border-gray-200">
                <div>
                  <label>Modelo e região</label>
                  <select name="model" value={frame.model} onChange={e => setFrame({ ...frame, model: e.target.value })}>
                    {values.model.map((model, index) => (
                      <option key={index} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select name="region" value={frame.region} onChange={e => setFrame({ ...frame, region: e.target.value })}>
                    {values.region.map((region, index) => (
                      <option key={index} value={region}>Região {region}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="border-b border-gray-200">
                <div>
                  <label>Características do modelo</label>
                  <div>
                    <input type="radio" name="options" value="Níveis isobáricos" onChange={e => setFrame({ ...frame, options: e.target.value })} defaultChecked={frame.options === "Níveis isobáricos"} /> Níveis isobáricos
                  </div>
                  <div>
                    <input type="radio" name="options" value="Níveis simples" onChange={e => setFrame({ ...frame, options: e.target.value })} defaultChecked={frame.options === "Níveis simples"} /> Níveis simples
                  </div>
                  <div>
                    <input type="radio" name="options" value="Conjuntos" onChange={e => setFrame({ ...frame, options: e.target.value })} defaultChecked={frame.options === "Conjuntos"} /> Conjuntos
                  </div>
                  <select name="field" value={frame.field} onChange={e => setFrame({ ...frame, field: e.target.value })}>
                    {values.field.map((field, index) => (
                      <option key={index} value={field}>{field}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="init">Inicialização</label>
                  <select name="init" value={frame.init} onChange={e => setFrame({ ...frame, init: e.target.value })}>
                    {values.init.map((init, index) => (
                      <option key={index} value={init}>{init}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        )}

        <div className="mx-2">
          <div className="font-bold text-sm">{frame.model} {">"} Região {frame.region}</div>
          <div className="text-xs">{frame.init}</div>
        </div>
      </div>
      <div className="flex relative">
        <div className="flex gap-1">
          <button className={classButton}><FaChevronLeft /></button>
          <button className={classButton}><FaPlay /></button>
          <button className={classButton}><FaChevronRight /></button>
        </div>
        <div className="flex items-center">
          <div className="font-bold text-sm px-2">{frame.start} horas</div>
          <button className={classButton} onClick={handleDropdownTime}><FaClock /></button>
          {openDropdownTime && (
            <div className="absolute top-12 right-0 bg-gray-100 border border-gray-200 rounded-md p-4">
              <div>
                <label>Horas de previsão</label>
                <div>
                  {values.start.map((start, index) => (
                    <button key={index} className={frame.start === start ? classButtonTimeActive : classButtonTime} onClick={() => setFrame({ ...frame, start })}>{start}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ImageFrame = ({ frames, id }) => {

  console.log(frames, id)
  
  return (
    <div>
      <img src="https://picsum.photos/200/300" alt="imagem" className="rounded-md mt-4 w-full " />
    </div>
  )
}

export default function Frame({ frames, id, values }) {
  return (
    <div className="flex flex-col border-r border-b border-gray-r-300 p-4">
      <TopFrame frames={frames} id={id} values={values} />
      <ImageFrame frames={frames} />
    </div>
  )
}

Frame.propTypes = {
  id: PropTypes.number,
  frames: PropTypes.array,
  values: PropTypes.object,
}

TopFrame.propTypes = {
  id: PropTypes.number,
  frames: PropTypes.array,
  values: PropTypes.object,
}

ImageFrame.propTypes = {
  id: PropTypes.number,
  frames: PropTypes.array,
}
