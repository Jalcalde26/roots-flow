import { useState } from 'react'
import { useMemo } from 'react'
import calcTree from 'relatives-tree';
import { IndividualCard } from './componentes/IndividualCard';
import treeDataJSON from './data/family-tree.json';
import getListadoFamiliar from './logica/getListadoFamiliar';
import normalizarNodes from './logica/normalizarNodes';

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

  const [personaInicialId, setPersonaInicialId] = useState("per-001");

  const listadoFamiliar = useMemo(() => getListadoFamiliar(personaInicialId, treeDataJSON.personas), [personaInicialId , treeDataJSON]);
  const listadoFamiliarFormateado = {
      p2: Object.values(listadoFamiliar.p2).flat(),
      p1: Object.values(listadoFamiliar.p1).flat(),
      ego: listadoFamiliar.ego
  };

  const nodes = normalizarNodes(Object.values(listadoFamiliarFormateado).flat());
  const tree = useMemo(() => calcTree(nodes, { rootId: personaInicialId }),[nodes, personaInicialId]);

  const WIDTH = 240;
  const HEIGHT = 160; //reajustar si es necesario

  return (
    <>
      <div className="relative" style={{ width: tree.canvas.width * (WIDTH / 2), height: tree.canvas.height * (HEIGHT / 2) }}>
        {tree.nodes.map(node => {
          const persona = treeDataJSON.personas.find(p => p.id === node.id);
          return (
            <IndividualCard
              key={node.id}
              persona={persona}
              style={{
                position: 'absolute',
                left: node.left * (WIDTH / 2),
                top: node.top * (HEIGHT / 2),
              }}
            />
          );
        })}
      </div>
    </>
  )
}

export default App;
