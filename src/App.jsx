import { useState } from 'react'
import { useMemo } from 'react'
import { IndividualCard } from './componentes/IndividualCard';
import treeDataJSON from './data/family-tree.json';
import { NivelGeneracional } from './componentes/NivelGeneracional';
import { ArbolGenealogico } from './componentes/ArbolGenealogico';
import getListadoFamiliar from './logica/getListadoFamiliar';

function App() {
 // array de pruebas
  //const listadoFamiliar = [ [treeData.personas[0], treeData.personas[14], treeData.personas[1], treeData.personas[3]], [treeData.personas[4], treeData.personas[3]] , [treeData.personas[2], treeData.personas[1], treeData.personas[0]]  ]; // Evitar que se cree un array vacío

 //   TO DO: CONSTRUIR LOGICA CALCULO DE ARBOL
 // en app.jsx al calcular las generaciones se añadira la prop pariente y generacion a cada miembro, extrayendo de ahí para IndividualCard
    /*
        
    */
  //const [treeData, setTreeData] = useState(treeDataJSON); 
  // al migrar a base de datos
  /* useEffect(() => {
      fetch('/api/personas')
      .then(res => res.json())
      .then(data => setTreeData(data));
  }, []);*/

  const [personaInicialId, setPersonaInicialId] = useState("per-003");

  const listadoFamiliar = useMemo(() => getListadoFamiliar(personaInicialId, treeDataJSON.personas), [personaInicialId , treeDataJSON]);
  const listadoFamiliarFormateado = {
      
      p2: Object.values(listadoFamiliar.p2).flat(),
      p1: Object.values(listadoFamiliar.p1).flat(),
      ego: listadoFamiliar.ego
  }

  console.log(listadoFamiliar);
  console.log(listadoFamiliarFormateado)

  return (
    <>
      <ArbolGenealogico
        listadoFamiliar = {listadoFamiliarFormateado}
        children={(personas) => (
          <NivelGeneracional
            key ={personas[0].generacion}
            personas = {personas}
            children = {(persona) => (
                          <IndividualCard
                            key = {persona.id}
                            persona = {persona}
                            generacion = {persona.generacion}
                            pariente = {persona.pariente}
                          />
                        )}
          />
        )}
      />
    </>
  )
}

export default App;
