import { useState } from 'react'
import { IndividualCard } from './componentes/IndividualCard';
import treeData from './data/family-tree.json';
import { NivelGeneracional } from './componentes/NivelGeneracional';
import { ArbolGenealogico } from './componentes/ArbolGenealogico';

function App() {

  const listadoFamiliar = [ [treeData.personas[0], treeData.personas[14 ], treeData.personas[1], treeData.personas[3]], [treeData.personas[4], treeData.personas[3]] , [treeData.personas[2], treeData.personas[1], treeData.personas[0]]  ]; // Evitar que se cree un array vacío

 //   TO DO: CONSTRUIR LOGICA CALCULO DE ARBOL

  return (
    <>
      <ArbolGenealogico
        listadoFamiliar = {listadoFamiliar}
        children={(personas) => (
          <NivelGeneracional
            //key ={personas[0].generacion}
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


 /*if (generacion === generacionEgo) filaImprimir = getHermanos({persona}, personas);
  if (generacion === generacionP1) {
      const tios = {tiosPaternos, tiosMaternos} = getTios({persona}, personas);
      const padres = {padre, madre} = getPadres({persona}, personas);

      forEach.tiosPaternos( p => filaImprimir.push(p));
      filaImprimir.push(padre).push(madre);
      forEach.tiosMaternos( p => filaImprimir.push(p));
  }
  if (generacion === generacionP1)*/