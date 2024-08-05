import { useState } from "react"
import TimeZone from "./TimeZone"

export default function FusoHorario() {

  const timeZoneLocal: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timeZoneSelected, setTimeZoneSelected] = useState<string[]>([timeZoneLocal])
  const timeZones: string[] = [
    "UTC",
    "GMT",
    "America/Sao_Paulo",
    "America/Los_Angeles",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "Europe/London",
    "Europe/Berlin",
    "Europe/Moscow",
    "Europe/Kiev",
    "Asia/Tokyo",
  ]

  function changeTimeZone(e: React.ChangeEvent<HTMLSelectElement>) {
    const alreadyExistsTimeZone = timeZoneSelected.includes(e.target.value)
    if (alreadyExistsTimeZone) return
    setTimeZoneSelected([...timeZoneSelected, e.target.value])
  }

  console.log("timeZoneSelected", timeZoneSelected)

  return (
    <div>
      <p>Selecione uma região:</p>
      <select onChange={changeTimeZone} value={timeZoneLocal}>
        {timeZones.map((timeZone) => (
          <option key={timeZone} value={timeZone}>
            {timeZone}
          </option>
        ))}
      </select>
      <p>Fuso horário:</p>
      {timeZoneSelected.map((timeZone) => (
        <TimeZone key={timeZone} timeZone={timeZone} />
      ))}
    </div>
  )
}
