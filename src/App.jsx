import { useState, useRef } from 'react'
import treeDataJSON from './data/family-tree.json';
import 'family-chart/styles/family-chart.css';
import ArbolFamiliar from './componentes/ArbolFamiliar.jsx';
import RootsflowLayout from './componentes/RootsflowLayout.jsx';
import BiographyPanel from './componentes/BiographyPanel.jsx'

function App() {

  const [personaInicialId, setPersonaInicialId] = useState("per-001"); 
  const arbolRef = useRef(null);

  const data = [
              {
              "id": "per-001",
              "nombre": "Laura",
              "apellidoPaterno": "Alcalde",
              "apellidoMaterno": "Molina",
              "fotografia": "public/personas/foto prueba.png",
              "sexo": "m",
              "fechaNacimiento": "2002-01-14",
              "fechaDefuncion": null,
              "lugarNacimiento": "Sevilla",
              "familiasIds": [ "fam-001", "fan-002" ],
              "padreId": "per-004",
              "madreId": "per-005",
              "hijosIds": [],
              "parejasId":[]
              },
              {
              "id": "per-008",
              "nombre": "Isabel",
              "apellidoPaterno": "Alcalde",
              "apellidoMaterno":"Lopez",
              "fotografia": null,
              "sexo": "m",
              "fechaNacimiento": "1971-08-11",
              "fechaDefuncion": null,
              "lugarNacimiento": "Sevilla",
              "familiasIds": ["fam-001"],
              "padreId":  "per-006",
              "madreId": "per-007",
              "hijosIds": [ "per-010" ],
              "parejasId": ["per-009"]
              },
              {
            "id": "per-009",
            "nombre": "Javier",
            "apellidoPaterno": "Herrera",
            "apellidoMaterno":"Jurado",
            "fotografia": null,
            "sexo": "h",
            "fechaNacimiento": "1968-08-27",
            "fechaDefuncion": null,
            "lugarNacimiento": "Puigcerda (Gerona)",
            "familiasIds": [],
            "padreId":  null,
            "madreId": null,
            "hijosIds": [ "per-010" ],
            "parejasId": ["per-008"]
            },
            {
                "id": "per-010",
                "nombre": "Carmen",
                "apellidoPaterno": "Herrera",
                "apellidoMaterno":"Alcalde",
                "fotografia": null,
                "sexo": "m",
                "fechaNacimiento": "2004-10-08",
                "fechaDefuncion": null,
                "lugarNacimiento": "Sevilla",
                "familiasIds": ["fam-001"],
                "padreId":  "per-009",
                "madreId": "per-008",
                "hijosIds": [],
                "parejasId": []
            },
              {
              "id": "per-002",
              "nombre": "Julián",
              "apellidoPaterno": "Alcalde",
              "apellidoMaterno": "Molina",
              "fotografia": null,
              "sexo": "h",
              "fechaNacimiento": "1998-07-06",
              "fechaDefuncion": null,
              "lugarNacimiento": "Sevilla",
              "familiasIds": [ "fam-001", "fan-002" ],
              "padreId": "per-004",
              "madreId": "per-005",
              "hijosIds": [],
              "parejasId":[]
            },
            {
              "id": "per-003",
              "nombre": "Rafael",
              "apellidoPaterno": "Alcalde",
              "apellidoMaterno": "Molina",
              "fotografia": null,
              "sexo": "h",
              "fechaNacimiento": "1995-04-26",
              "fechaDefuncion": null,
              "lugarNacimiento": "Sevilla",
              "familiasIds": [ "fam-001", "fan-002" ],
              "padreId":  "per-004",
              "madreId":"per-005",
              "hijosIds": [],
              "parejasId":[]
            },
            {
              "id": "per-004",
              "nombre": "Rafael",
              "apellidoPaterno": "Alcalde",
              "apellidoMaterno": "Lopez",
              "fotografia": null,
              "sexo": "h",
              "fechaNacimiento": "1966-07-06",
              "fechaDefuncion": null,
              "lugarNacimiento": "Sevilla",
              "familiasIds": [ "fam-001" ],
              "padreId":  "per-006",
              "madreId": "per-007",
              "hijosIds": ["per-001", "per-002", "per-003"],
              "parejasId": ["per-005"]
            },
            {
              "id": "per-005",
              "nombre": "Pilar",
              "apellidoPaterno": "Molina",
              "apellidoMaterno": "Legaz",
              "fotografia": null,
              "sexo": "m",
              "fechaNacimiento": "1965-07-18",
              "fechaDefuncion": null,
              "lugarNacimiento": "Murcia",
              "familiasIds": [ "fam-002" ],
              "padreId": "per-042",
              "madreId": "per-043",
              "hijosIds": ["per-001", "per-002", "per-003"],
              "parejasId": ["per-004"]
            },
            {
              "id": "per-006",
              "nombre": "Rafael",
              "apellidoPaterno": "Alcalde",
              "apellidoMaterno":"De Paz",
              "fotografia": null,
              "sexo": "h",
              "fechaNacimiento": "1934-07-29",
              "fechaDefuncion": null,
              "lugarNacimiento": "Córdoba",
              "familiasIds": [ "fam-001" ],
              "padreId":  null,
              "madreId": null,
              "hijosIds": ["per-004", "per-008" ],
              "parejasId": ["per-007"]
            },
            {
              "id": "per-007",
              "nombre": "Juana",
              "apellidoPaterno": "Lopez",
              "apellidoMaterno":"Guillen",
              "fotografia": null,
              "sexo": "m",
              "fechaNacimiento": "1944-07-19",
              "fechaDefuncion": null,
              "lugarNacimiento": "Santiago de Alcántara (Cáceres)",
              "familiasIds": ["fam-003"],
              "padreId":  "per-036",
              "madreId": "per-035",
              "hijosIds": ["per-004", "per-008" ],
              "parejasId": ["per-006"]
            },
            {
              "id": "per-042",
              "nombre": "Francisco",
              "apellidoPaterno": "Molina",
              "apellidoMaterno": null,
              "fotografia": null,
              "sexo": "h",
              "fechaNacimiento": null,
              "fechaDefuncion": null,
              "lugarNacimiento": "Totana (Murcia)",
              "familiasIds": ["fam-002"],
              "padreId":  null,
              "madreId": null,
              "hijosIds": ["per-041", "per-005"],
              "parejasId": ["per-043"]
            },
            {
            "id": "per-041",
            "nombre": "Roque",
            "apellidoPaterno": "Molina",
            "apellidoMaterno":"Legaz",
            "fotografia": null,
            "sexo": "h",
            "fechaNacimiento": null,
            "fechaDefuncion": null,
            "lugarNacimiento": "Totana (Murcia)",
            "familiasIds": ["fam-002"],
            "padreId":  "per-042",
            "madreId": "per-043",
            "hijosIds": [],
            "parejasId": []
            },
            {
              "id": "per-043",
              "nombre": "Vicenta",
              "apellidoPaterno": "Legaz",
              "apellidoMaterno": "Muñoz",
              "fotografia": null,
              "sexo": "m",
              "fechaNacimiento": null,
              "fechaDefuncion": null,
              "lugarNacimiento": "Totana (Murcia)",
              "familiasIds": [],
              "padreId":  null,
              "madreId": null,
              "hijosIds": ["per-041", "per-005"],
              "parejasId": ["per-042"]
          }]

  const persona = data.find( p => p.id === personaInicialId);

  

  
  
  return (
    <>
      <div className="w-screen h-screen">
        <RootsflowLayout
          onAsideTransitionEnd={() => arbolRef.current.resetView()}
          children={
            <ArbolFamiliar
              ref={arbolRef}
              personas = {data}
              mainId = {personaInicialId}
              personaOnClick = {setPersonaInicialId}
            />
          }
          aside={
            <BiographyPanel
              persona={persona}
              id = {personaInicialId}
            />
          }
        /> 
      </div>
    </>
  )
}

export default App;
