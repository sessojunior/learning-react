import { FaRegRectangleList, FaChevronLeft, FaPlay, FaPause, FaChevronRight, FaClock } from "react-icons/fa6"
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useContext } from 'react'
import { ConfigContext } from '../contexts/Config'

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

  {/* Begin Timer */ }

  // Initialize state variables for timer and timeInterval
  const [timer, setTimer] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);
  const [currentTime, setCurrentTime] = useState(model.possibleValues.time[model.possibleValues.time.indexOf(frame.currentTime)])

  useEffect(() => {
    // console.log("currentTime", currentTime)
    setFrame({ ...frame, currentTime: currentTime })
  }, [timer]);

  // Function to start the timer
  const startTimer = () => {
    // Use setInterval to update the timer every 1000 milliseconds (1 second)
    setTimeInterval(setInterval(() => {
      // Update the timer by incrementing the previous value by 1
      setTimer((prev) => prev + 1)
      setCurrentTime((prev) => {
        if (prev === model.possibleValues.time[model.possibleValues.time.length - 1]) {
          return model.possibleValues.time[0]
        } else {
          return model.possibleValues.time[model.possibleValues.time.indexOf(prev) + 1]
        }
      })
      setFrame({ ...frame, isPlaying: true })
    }, 1000))
  }

  // Function to pause the timer
  const pauseTimer = () => {
    // Clear the interval to stop the timer from updating
    clearInterval(timeInterval)
    setFrame({ ...frame, isPlaying: false })
  }

  // Function to reset the timer
  // const resetTimer = () => {
  //   // Reset the timer value to 0
  //   setTimer(0)
  //   setFrame({ ...frame, isPlaying: true, currentTime: model.possibleValues.time[0] })
  //   // Clear the interval to stop the timer
  //   clearInterval(timeInterval)
  // }

  {/* End Timer */}

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
  // console.log("TopFrame (frame)", frame)

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
                <button key={index} className={frame.currentTime === time ? classButtonTimeActive : classButtonTime} onClick={() => setFrame({ ...frame, currentTime: time })}>{time}</button>
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
          {frame.isPlaying ? (
            <button className={classButton} onClick={pauseTimer}><FaPause /></button>
          ) : (
            <button className={classButton} onClick={startTimer}><FaPlay /></button>
          )}
          {/* <button className={classButton} onClick={resetTimer}>Reset</button> */}
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
  // console.log("frame", frame)

  return (
    <div>
      <p>Dados para a troca de imagem:</p>
      <p>[frame.model: {frame.model}]</p>
      <p>[frame.region: {frame.region}]</p>
      <p>[frame.options: {frame.options}]</p>
      <p>[frame.field: {frame.field}]</p>
      <p>[frame.init: {frame.init}]</p>
      <p>[model.possibleValues.time: {model.possibleValues.time.map(time => time + " ")}]</p>
      <p><b>[frame.currentTime: {frame.currentTime}]</b></p>
      <p>[frame.isPlaying: {frame.isPlaying ? "true" : "false"}]</p>
      <img src="https://s1.cptec.inpe.br/grafico/Modelos/SMNA/figuras/precipitacao/2024/07/11/00/prec_6h_glo_2024071100Z_2024071100Z.png" alt="imagem" className="rounded-md mt-4 w-full " />
    </div>
  )
}

export default function Frame({ id, frames, models }) {
  
  const { config } = useContext(ConfigContext)

  const [frame, setFrame] = useState(frames.find(frame => frame.id === id))
  // console.log("Frame (id, frame)", id, frame)

  const model = models.find(model => model.name === frame.model)
  // console.log("model", model)

  let classFrame = ""
  if (config.quantityFrames === 1) {
    classFrame = "flex flex-col border-l border-r border-gray-r-300 border-gray-l-300 p-4"
  } else {
    classFrame = "flex flex-col border-r border-b border-gray-r-300 p-4"
  }

  return (
    <div className={classFrame}>
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
