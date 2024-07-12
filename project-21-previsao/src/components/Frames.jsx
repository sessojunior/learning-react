import Frame from "./Frame"

export default function Frames() {

  const frames = [
    {
      id: 1,
      model: "BAM",
      region: "Sul",
      options: "Níveis isobáricos",
      field: "Campo 3",
      init: "Qua 05 Jun 2024 00 UTC",
      start: "030",
    },
    {
      id: 2,
      model: "WRF",
      region: "Sul",
      options: "Níveis simples",
      field: "Campo 4",
      init: "Qua 05 Jun 2024 06 UTC",
      start: "024",
    },
    {
      id: 3,
      model: "BRAMS",
      region: "Sul",
      options: "Conjuntos",
      field: "Campo 7",
      init: "Qua 05 Jun 2024 12 UTC",
      start: "036",
    },
    {
      id: 4,
      model: "Outros",
      region: "Sul",
      options: "Níveis isobáricos",
      field: "Campo 3",
      init: "Qua 05 Jun 2024 18 UTC",
      start: "024",
    },
  ]

  const values = {
    model: ["BAM", "WRF", "BRAMS", "Outros"],
    region: ["Norte", "Sul", "Centro-Oeste", "Nordeste", "Sudeste"],
    options: ["Níveis isobáricos", "Níveis simples", "Conjuntos"],
    field: ["Campo 3", "Campo 4", "Campo 7"],
    init: ["Qua 05 Jun 2024 00 UTC", "Qua 05 Jun 2024 06 UTC", "Qua 05 Jun 2024 12 UTC", "Qua 05 Jun 2024 18 UTC"],
    start: ["024", "030", "036", "040", "048", "060", "072", "084", "096", "108", "120", "132", "144", "156", "168", "180", "192", "204", "216", "228", "240"],
  }

  return (
    <div className="grid grid-cols-2">
      <Frame frames={frames} id={1} values={values} />
      <Frame frames={frames} id={2} values={values} />
      <Frame frames={frames} id={3} values={values} />
      <Frame frames={frames} id={4} values={values} />
    </div>
  )
}
