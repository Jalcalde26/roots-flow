import { useState } from 'react'
import { IndividualCard } from './componentes/IndividualCard';
import treeData from './data/family-tree.json';
import { NivelGeneracional } from './componentes/NivelGeneracional';
import { ArbolGenealogico } from './componentes/ArbolGenealogico';

function App() {

  const listadoFamiliar; // Evitar que se cree un array vacío

  if (generacion === generacionEgo) filaImprimir = getHermanos({persona}, personas);
  if (generacion === generacionP1) {
      const tios = {tiosPaternos, tiosMaternos} = getTios({persona}, personas);
      const padres = {padre, madre} = getPadres({persona}, personas);

      forEach.tiosPaternos( p => filaImprimir.push(p));
      filaImprimir.push(padre).push(madre);
      forEach.tiosMaternos( p => filaImprimir.push(p));
  }
  if (generacion === generacionP1)

  return (
    <>
      <ArbolGenealogico
        listadoFamiliar = {listadoFamiliar}
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
