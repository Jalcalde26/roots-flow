import { useState } from 'react'
import { IndividualCard } from './componentes/IndividualCard';
import treeData from './data/family-tree.json';

function App() {

const personaEj = treeData.personas.find(p => p.id === "per-014")
  
  return (
    <>
      <IndividualCard
      persona={personaEj}
      generacion="generacionP1"
      pariente="paterno"
      />
      
    </>
  )
}

export default App
