import { useState } from 'react'
import { IndividualCard } from './componentes/IndividualCard';
import treeData from './data/family-tree.json';

function App() {

const personaId = treeData.personas.find(p => p.id === "per-014")

  return (
    <>
      <IndividualCard
      persona={personaId}
      />
    </>
  )
}

export default App
