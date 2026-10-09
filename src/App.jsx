import { useState, useRef } from 'react'
import treeDataJSON from './data/family-tree.json';
import 'family-chart/styles/family-chart.css';
import FamilyTree from './components/FamilyTree.jsx';
import RootsflowLayout from './components/RootsflowLayout.jsx';
import AsidePanel from './components/AsidePanel.jsx'


function App() {

  const [mainPersonId, setMainPersonId] = useState("per-001");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const treeRef = useRef(null);
  
  return (
    <>
      <div className={`relative w-[100vw] h-[100vh] max-lg:h-dvh font-roboto ${isDarkMode ? `font-darkFont bg-darkBg` : `light text-lightFont bg-lightBg`} `}>
        <RootsflowLayout
          onAsideTransitionEnd={() => treeRef.current.resetView()}
          isDarkMode = {isDarkMode}
          children={
            <FamilyTree
              ref={treeRef}
              people = {treeDataJSON.people}
              mainId = {mainPersonId}
              onPersonClick = {setMainPersonId}
              isDarkMode = {isDarkMode}
              setIsDarkMode = {setIsDarkMode}
            />
          }
          aside={
            <AsidePanel
              key={mainPersonId}
              people={treeDataJSON.people}
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
