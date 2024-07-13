import Frame from "./Frame"

import { useContext } from 'react'
import { ConfigContext } from '../contexts/Config'

export default function Frames() {
  
  const { config } = useContext(ConfigContext)

  const models = [
    {
      id: 1,
      name: "BAM",
      defaultValues: {
        region: "Sul",
        options: "Níveis isobáricos A",
        field: "Campo 3A",
        init: "Qua 05 Jun 2024 18 UTC",
        currentTime: "096",
      },
      possibleValues: {
        region: ["Norte", "Sul", "Centro-Oeste", "Nordeste", "Sudeste"],
        options: ["Níveis isobáricos A", "Níveis simples A", "Conjuntos A"],
        field: ["Campo 3A", "Campo 4A", "Campo 7A"],
        init: ["Qua 05 Jun 2024 00 UTC", "Qua 05 Jun 2024 06 UTC", "Qua 05 Jun 2024 12 UTC", "Qua 05 Jun 2024 18 UTC"],
        time: ["024", "030", "036", "040", "048", "060", "072", "084", "096"],
      },
    },
    {
      id: 2,
      name: "WRF",
      defaultValues: {
        region: "Sul",
        options: "Níveis simples B",
        field: "Campo 4B",
        init: "Qua 05 Jun 2024 06 UTC",
        currentTime: "024",
      },
      possibleValues: {
        region: ["Sul", "Centro-Oeste", "Nordeste"],
        options: ["Níveis isobáricos B", "Níveis simples B", "Conjuntos B"],
        field: ["Campo 3B", "Campo 4B", "Campo 7B"],
        init: ["Qua 05 Jun 2024 00 UTC", "Qua 05 Jun 2024 06 UTC", "Qua 05 Jun 2024 12 UTC", "Qua 05 Jun 2024 18 UTC"],
        time: ["024", "030", "036", "040", "048", "060", "072", "084", "096", "108", "120", "132", "144", "156", "168", "180", "192", "204", "216", "228", "240"],
      },
    },
    {
      id: 3,
      name: "BRAMS",
      defaultValues: {
        region: "América do Sul",
        options: "Conjuntos C",
        field: "Campo 7C",
        init: "Qua 05 Jun 2024 12 UTC",
        currentTime: "036",
      },
      possibleValues: {
        region: ["América do Sul", "Brasil"],
        options: ["Níveis isobáricos C", "Níveis simples C", "Conjuntos C"],
        field: ["Campo 3C", "Campo 4C", "Campo 7C"],
        init: ["Qua 05 Jun 2024 00 UTC", "Qua 05 Jun 2024 06 UTC", "Qua 05 Jun 2024 12 UTC", "Qua 05 Jun 2024 18 UTC"],
        time: ["030", "036", "040", "048", "060", "072", "084", "096", "108", "120", "132", "144", "156", "168", "180"],
      },
    },
    {
      id: 4,
      name: "Outros",
      defaultValues: {
        region: "Sul",
        options: "Níveis isobáricos D",
        field: "Campo 3D",
        init: "Qua 05 Jun 2024 18 UTC",
        currentTime: "096",
      },
      possibleValues: {
        region: ["Norte", "Sul", "Centro-Oeste", "Nordeste", "Sudeste"],
        options: ["Níveis isobáricos D", "Níveis simples D", "Conjuntos D"],
        field: ["Campo 3D", "Campo 4D", "Campo 7D"],
        init: ["Qua 05 Jun 2024 00 UTC", "Qua 05 Jun 2024 06 UTC", "Qua 05 Jun 2024 12 UTC", "Qua 05 Jun 2024 18 UTC"],
        time: ["040", "048", "060", "072", "084", "096", "108", "120", "132", "144", "156", "168", "180", "192"],
      },
    },
  ]

  const frames = [
    {
      id: 1,
      model: "BAM",
      region: "Sul",
      options: "Níveis isobáricos A",
      field: "Campo 3A",
      init: "Qua 05 Jun 2024 00 UTC",
      currentTime: "030",
      isPlaying: false,
    },
    {
      id: 2,
      model: "WRF",
      region: "Sul",
      options: "Níveis simples B",
      field: "Campo 4B",
      init: "Qua 05 Jun 2024 06 UTC",
      currentTime: "024",
      isPlaying: false,
    },
    {
      id: 3,
      model: "BRAMS",
      region: "América do Sul",
      options: "Conjuntos C",
      field: "Campo 7C",
      init: "Qua 05 Jun 2024 12 UTC",
      currentTime: "036",
      isPlaying: false,
    },
    {
      id: 4,
      model: "Outros",
      region: "Sul",
      options: "Níveis isobáricos D",
      field: "Campo 3D",
      init: "Qua 05 Jun 2024 18 UTC",
      currentTime: "096",
      isPlaying: false,
    },
  ]

  return (
    <>
      {config.quantityFrames === 1 && (
        <div className="flex justify-center items-center max-w-3xl mx-auto">
          <Frame id={1} frames={frames} models={models} />
        </div>
      )}
      {(config.quantityFrames === 2) && (
        <div className="grid grid-cols-2">
          <Frame id={1} frames={frames} models={models} />
          <Frame id={2} frames={frames} models={models} />
        </div>
      )}
      {(config.quantityFrames === 4) && (
        <div className="grid grid-cols-2">
          <Frame id={1} frames={frames} models={models} />
          <Frame id={2} frames={frames} models={models} />
          <Frame id={3} frames={frames} models={models} />
          <Frame id={4} frames={frames} models={models} />
        </div>
      )}
    </>
  )
}
