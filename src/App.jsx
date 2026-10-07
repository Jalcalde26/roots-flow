import { useState, useRef } from 'react'
import treeDataJSON from './data/family-tree.json';
import 'family-chart/styles/family-chart.css';
import FamilyTree from './components/FamilyTree.jsx';
import RootsflowLayout from './components/RootsflowLayout.jsx';
import AsidePanel from './components/AsidePanel.jsx'


function App() {

  const [mainPersonId, setMainPersonId] = useState("per-004");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const treeRef = useRef(null);

  const data = [
              {
                "id": "per-001",
                "firstName": "Laura",
                "paternalSurname": "Alcalde",
                "maternalSurname": "Molina",
                "photo": "public/personas/foto prueba.png",
                "sex": "female",
                "birthDate": "2002-01-14",
                "deathDate": null,
                "birthPlace": "Sevilla",
                "familyIds": [ "fam-001", "fan-002" ],
                "fatherId": "per-004",
                "motherId": "per-005",
                "childrenIds": [],
                "spouseIds":[],
                "biography":["Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem excepturi libero nulla fugiat minima culpa? Voluptatibus maiores distinctio iure modi nisi alias obcaecati ipsam exercitationem nam? Aliquid pariatur veritatis quisquam?",
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem excepturi libero nulla fugiat minima culpa? Voluptatibus maiores distinctio iure modi nisi alias obcaecati ipsam exercitationem nam? Aliquid pariatur veritatis quisquam?",
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem excepturi libero nulla fugiat minima culpa? Voluptatibus maiores distinctio iure modi nisi alias obcaecati ipsam exercitationem nam? Aliquid pariatur veritatis quisquam?",
                              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi explicabo velit ullam dicta exercitationem asperiores veritatis, optio sint maiores, beatae odit qui odio omnis, impedit deleniti? Accusamus eveniet labore ut!",
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illo et dolorem deleniti dolor nostrum accusamus, beatae blanditiis iure magni, ducimus quis officia harum nobis? Assumenda sit est commodi at."
                            ],
                "profession": "Bióloga",
                "milestones": [
                  {"title": "Graduación Universitaria", "date": "2025-07-25", "description": "Se gradúo con excelencia académica, siendo de las mejores posicionadas de su promoción."},
                  {"title": "Graduación Universitaria", "date": "2025-07-25", "description": "Se gradúo con excelencia académica, siendo de las mejores posicionadas de su promoción."},
                  {"title": "Graduación Universitaria", "date": "2025-07-25", "description": "Se gradúo con excelencia académica, siendo de las mejores posicionadas de su promoción."}
                ]
              },
              {
              "id": "per-008",
              "firstName": "Isabel",
              "paternalSurname": "Alcalde",
              "maternalSurname":"Lopez",
              "photo": null,
              "sex": "female",
              "birthDate": "1971-08-11",
              "deathDate": null,
              "birthPlace": "Sevilla",
              "familyIds": ["fam-001"],
              "fatherId":  "per-006",
              "motherId": "per-007",
              "childrenIds": [ "per-010" ],
              "spouseIds": ["per-009"]
              },
              {
            "id": "per-009",
            "firstName": "Javier",
            "paternalSurname": "Herrera",
            "maternalSurname":"Jurado",
            "photo": null,
            "sex": "male",
            "birthDate": "1968-08-27",
            "deathDate": null,
            "birthPlace": "Puigcerda (Gerona)",
            "familyIds": [],
            "fatherId":  null,
            "motherId": null,
            "childrenIds": [ "per-010" ],
            "spouseIds": ["per-008"]
            }, 
            {
                "id": "per-010",
                "firstName": "Carmen",
                "paternalSurname": "Herrera",
                "maternalSurname":"Alcalde",
                "photo": null,
                "sex": "female",
                "birthDate": "2004-10-08",
                "deathDate": null,
                "birthPlace": "Sevilla",
                "familyIds": ["fam-001"],
                "fatherId":  "per-009",
                "motherId": "per-008",
                "childrenIds": [],
                "spouseIds": [],
            },
              {
              "id": "per-002",
              "firstName": "Julián",
              "paternalSurname": "Alcalde",
              "maternalSurname": "Molina",
              "photo": null,
              "sex": "male",
              "birthDate": "1998-07-06",
              "deathDate": null,
              "birthPlace": "Sevilla",
              "familyIds": [ "fam-001", "fan-002" ],
              "fatherId": "per-004",
              "motherId": "per-005",
              "childrenIds": [],
              "spouseIds":[]
            },
            {
              "id": "per-003",
              "firstName": "Rafael",
              "paternalSurname": "Alcalde",
              "maternalSurname": "Molina",
              "photo": null,
              "sex": "male",
              "birthDate": "1995-04-26",
              "deathDate": null,
              "birthPlace": "Sevilla",
              "familyIds": [ "fam-001", "fan-002" ],
              "fatherId":  "per-004",
              "motherId":"per-005",
              "childrenIds": [],
              "spouseIds":[],
            },
            {
              "id": "per-004",
              "firstName": "Rafael",
              "paternalSurname": "Alcalde",
              "maternalSurname": "Lopez",
              "photo": null,
              "sex": "male",
              "birthDate": "1966-07-06",
              "deathDate": null,
              "birthPlace": "Sevilla",
              "familyIds": [ "fam-001" ],
              "fatherId":  "per-006",
              "motherId": "per-007",
              "childrenIds": ["per-001", "per-002", "per-003"],
              "spouseIds": ["per-005"],
              "marriageDate": "1995-05-23"
            },
            {
              "id": "per-005",
              "firstName": "Pilar",
              "paternalSurname": "Molina",
              "maternalSurname": "Legaz",
              "photo": null,
              "sex": "female",
              "birthDate": "1965-07-18",
              "deathDate": null,
              "birthPlace": "Murcia",
              "familyIds": [ "fam-002" ],
              "fatherId": "per-042",
              "motherId": "per-043",
              "childrenIds": ["per-001", "per-002", "per-003"],
              "spouseIds": ["per-004"],
              "marriageDate": " "
            },
            {
              "id": "per-006",
              "firstName": "Rafael",
              "paternalSurname": "Alcalde",
              "maternalSurname":"De Paz",
              "photo": null,
              "sex": "male",
              "birthDate": "1934-07-29",
              "deathDate": null,
              "birthPlace": "Córdoba",
              "familyIds": [ "fam-001" ],
              "fatherId":  null,
              "motherId": null,
              "childrenIds": ["per-004", "per-008" ],
              "spouseIds": ["per-007"]
            },
            {
              "id": "per-007",
              "firstName": "Juana",
              "paternalSurname": "Lopez",
              "maternalSurname":"Guillen",
              "photo": null,
              "sex": "female",
              "birthDate": "1944-07-19",
              "deathDate": null,
              "birthPlace": "Santiago de Alcántara (Cáceres)",
              "familyIds": ["fam-003"],
              "fatherId":  null,
              "motherId": null,
              "childrenIds": ["per-004", "per-008" ],
              "spouseIds": ["per-006"]
            },
            {
              "id": "per-042",
              "firstName": "Francisco",
              "paternalSurname": "Molina",
              "maternalSurname": null,
              "photo": null,
              "sex": "male",
              "birthDate": "undefined",
              "deathDate": "undefined",
              "birthPlace": "Totana (Murcia)",
              "familyIds": ["fam-002"],
              "fatherId":  null,
              "motherId": null,
              "childrenIds": ["per-041", "per-005"],
              "spouseIds": ["per-043"]
            },
            {
            "id": "per-041",
            "firstName": "Roque",
            "paternalSurname": "Molina",
            "maternalSurname":"Legaz",
            "photo": null,
            "sex": "male",
            "birthDate": null,
            "deathDate": null,
            "birthPlace": "Totana (Murcia)",
            "familyIds": ["fam-002"],
            "fatherId":  "per-042",
            "motherId": "per-043",
            "childrenIds": [],
            "spouseIds": []
            },
            {
              "id": "per-043",
              "firstName": "Vicenta",
              "paternalSurname": "Legaz",
              "maternalSurname": "Muñoz",
              "photo": null,
              "sex": "female",
              "birthDate": null,
              "deathDate": null,
              "birthPlace": "Totana (Murcia)",
              "familyIds": [],
              "fatherId":  null,
              "motherId": null,
              "childrenIds": ["per-041", "per-005"],
              "spouseIds": ["per-042"]
          }]

  


  

  
  
  return (
    <>
      <div className={`relative w-[100vw] h-[100vh] max-lg:h-dvh font-roboto ${isDarkMode ? `font-darkFont bg-darkBg` : `light text-lightFont bg-lightBg`} `}>
        <RootsflowLayout
          onAsideTransitionEnd={() => treeRef.current.resetView()}
          isDarkMode = {isDarkMode}
          children={
            <FamilyTree
              ref={treeRef}
              people = {data}
              mainId = {mainPersonId}
              onPersonClick = {setMainPersonId}
              isDarkMode = {isDarkMode}
              setIsDarkMode = {setIsDarkMode}
            />
          }
          aside={
            <AsidePanel
              key={mainPersonId}
              people={data}
              pets={treeDataJSON.pets}
              mainId = {mainPersonId}
              onPersonClick= {setMainPersonId}
              isDarkMode = {isDarkMode}
            />
          }
        /> 
      </div>
    </>
  )
}

export default App;
