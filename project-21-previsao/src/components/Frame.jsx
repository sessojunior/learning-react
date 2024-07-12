import { FaRegRectangleList, FaChevronLeft, FaPlay, FaChevronRight, FaClock } from "react-icons/fa6"
import { useState } from 'react'
import PropTypes from 'prop-types'

const TopFrame = ({ frame, setFrame, model, models }) => {

  const classButton = "size-9 md:size-[38px] inline-flex justify-center items-center gap-2 rounded-md font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-50 text-xs md:text-sm"

  const classButtonTime = "size-9 md:size-[38px] inline-flex justify-center items-center gap-2 rounded-md font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-50 text-xs md:text-sm"

  const classButtonTimeActive = "size-9 md:size-[38px] inline-flex justify-center items-center gap-2 rounded-md font-medium bg-blue-700 border border-gray-200 text-gray-50 focus:outline-none focus:bg-gray-50 text-xs md:text-sm"

  const [openDropdownConfig, setOpenDropdownConfig] = useState(false)
  const [openDropdownTime, setOpenDropdownTime] = useState(false)

  const handleDropdownConfig = () => {
    setOpenDropdownConfig(!openDropdownConfig)
  }

  const handleDropdownTime = () => {
    setOpenDropdownTime(!openDropdownTime)
  }

  const handleDecreaseTime = () => {
    // console.log("decreaseTime")
    // console.log("frame.currentTime", frame.currentTime)
    // console.log("model.possibleValues.time", model.possibleValues.time)
    // console.log("indexOf(model.currentTime)", model.possibleValues.time.indexOf(frame.currentTime))
    // console.log("model.possibleValues.time.length", model.possibleValues.time.length)
    if (model.possibleValues.time.indexOf(frame.currentTime) > 0) {
      // console.log("model.possibleValues.time[model.possibleValues.time.indexOf(frame.currentTime) - 1]", model.possibleValues.time[model.possibleValues.time.indexOf(frame.currentTime) - 1])
      const previousTime = model.possibleValues.time[model.possibleValues.time.indexOf(frame.currentTime) - 1]
      // console.log("previousTime", previousTime)
      setFrame({ ...frame, currentTime: previousTime })
    }
  }

  const handleIncreaseTime = () => {
    // console.log("increaseTime")
    // console.log("frame.currentTime", frame.currentTime)
    // console.log("model.possibleValues.time", model.possibleValues.time)
    // console.log("indexOf(frame.currentTime)", model.possibleValues.time.indexOf(frame.currentTime))
    // console.log("model.possibleValues.time.length", model.possibleValues.time.length)
    if (model.possibleValues.time.indexOf(frame.currentTime) < model.possibleValues.time.length - 1) {
      // console.log("model.possibleValues.time[model.possibleValues.time.indexOf(frame.currentTime) + 1]", model.possibleValues.time[model.possibleValues.time.indexOf(frame.currentTime) + 1])
      const nextTime = model.possibleValues.time[model.possibleValues.time.indexOf(frame.currentTime) + 1]
      // console.log("nextTime", nextTime)
      setFrame({ ...frame, currentTime: nextTime })
    }
  }

  const handleChangeModel = (e) => {
    const model = models.find(model => model.name === e.target.value)
    setFrame({
      ...frame,
      model: e.target.value,
      region: model.defaultValues.region,
      options: model.defaultValues.options,
      field: model.defaultValues.field,
      init: model.defaultValues.init,
      currentTime: model.defaultValues.currentTime,
    })

    console.log("handleChangeModel (frame)", frame)
  }

  // console.log("frames", frames)
  // console.log("possibleValues", model.possibleValues)
  // console.log("possibleValues.model", model.possibleValues.model)
  // console.log("id", id)
  console.log("TopFrame (frame)", frame)

  const DropDownConfig = () => {
    return (
      <>
        <form>
            <div className="absolute top-12 left-0 bg-gray-100 border border-gray-200 rounded-md p-4">
              <div className="border-b border-gray-200">
                <div>
                  <label>Modelo e região</label>
                  <select name="model" value={frame.model} onChange={e => handleChangeModel(e)}>
                    {models.map((model, index) => (
                      <option key={index} value={model.name}>{model.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select name="region" value={frame.region} onChange={e => setFrame({ ...frame, region: e.target.value })}>
                    {model.possibleValues.region.map((region, index) => (
                      <option key={index} value={region}>Região {region}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="border-b border-gray-200">
                <div>
                  <label>Características do modelo</label>
                  {model.possibleValues.options.map((option, index) => (
                    <div key={index}>
                      <input type="radio" name="options" value={option} onChange={e => setFrame({ ...frame, options: e.target.value })} defaultChecked={frame.options === option} /> {option}
                    </div>
                  ))}
                  <select name="field" value={frame.field} onChange={e => setFrame({ ...frame, field: e.target.value })}>
                    {model.possibleValues.field.map((field, index) => (
                      <option key={index} value={field}>{field}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="init">Inicialização</label>
                  <select name="init" value={frame.init} onChange={e => setFrame({ ...frame, init: e.target.value })}>
                    {model.possibleValues.init.map((init, index) => (
                      <option key={index} value={init}>{init}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
      </>
    )
  }

  const DropDownTime = () => {
    return (
      <>
        <div className="absolute top-12 right-0 bg-gray-100 border border-gray-200 rounded-md p-4">
          <div>
            <label>Horas de previsão</label>
            <div>
              {model.possibleValues.time.map((time, index) => (
                <button key={index} className={frame.currentTime === time ? classButtonTimeActive : classButtonTime} onClick={() => setFrame({ ...frame, time })}>{time}</button>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex justify-between">
      <div className="flex relative">
        <button className={classButton} onClick={handleDropdownConfig}><FaRegRectangleList /></button>
        {openDropdownConfig && <DropDownConfig />}
        <div className="mx-2">
          <div className="font-bold text-sm">{frame.model} {">"} Região {frame.region}</div>
          <div className="text-xs">{frame.init}</div>
        </div>
      </div>
      <div className="flex relative">
        <div className="flex gap-1">
          <button className={classButton} onClick={handleDecreaseTime}><FaChevronLeft /></button>
          <button className={classButton}><FaPlay /></button>
          <button className={classButton} onClick={handleIncreaseTime}><FaChevronRight /></button>
        </div>
        <div className="flex items-center">
          <div className="font-bold text-sm px-2">{frame.currentTime} horas</div>
          <button className={classButton} onClick={handleDropdownTime}><FaClock /></button>
          {openDropdownTime && <DropDownTime />}
        </div>
      </div>
    </div>
  )
}

const ImageFrame = ({ frame, model }) => {

  // console.log(frames, id)
  
  console.log("frame", frame)

  return (
    <div>
      <p>Url da imagem:</p>
      <p>[model: {frame.model}] [region: {frame.region}] [options: {frame.options}] [field: {frame.field}]</p>
      <p>[init: {frame.init}]</p>
      <p>[possibleValues.time: {model.possibleValues.time.map(time => time + " ")}]</p>
      <p><b>[currentTime: {frame.currentTime}]</b></p>
      <img src="https://s1.cptec.inpe.br/grafico/Modelos/SMNA/figuras/precipitacao/2024/07/11/00/prec_6h_glo_2024071100Z_2024071100Z.png" alt="imagem" className="rounded-md mt-4 w-full " />
    </div>
  )
}

export default function Frame({ id, frames, models }) {

  const [frame, setFrame] = useState(frames.find(frame => frame.id === id))
  console.log("Frame (id, frame)", id, frame)

  const model = models.find(model => model.name === frame.model)
  console.log("model", model)

  return (
    <div className="flex flex-col border-r border-b border-gray-r-300 p-4">
      <TopFrame frame={frame} setFrame={setFrame} frames={frames} model={model} models={models} />
      <ImageFrame frame={frame} frames={frames} model={model} />
    </div>
  )
}

Frame.propTypes = {
  id: PropTypes.number,
  frames: PropTypes.array,
  models: PropTypes.array,
}

TopFrame.propTypes = {
  frame: PropTypes.object,
  setFrame: PropTypes.func,
  model: PropTypes.object,
  models: PropTypes.array,
}

ImageFrame.propTypes = {
  frame: PropTypes.object,
  model: PropTypes.object,
}
