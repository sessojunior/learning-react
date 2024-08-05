import { useEffect, useState } from "react"



export default function TimeZone({ timeZone }: { timeZone: string }) {

  const [time, setTime] = useState<string>("")

  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      const timeString = date.toLocaleTimeString("pt-BR", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      setTime(timeString)
    }, 1000)
  }, [timeZone])

  return (
    <>
      <p><b>Zona:</b> {timeZone} - <b>Horário:</b> {time}</p>
    </>
  )
}
