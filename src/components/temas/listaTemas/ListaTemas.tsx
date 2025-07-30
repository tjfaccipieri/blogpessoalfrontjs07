/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react"
import CardTemas from "../cardTemas/CardTemas"
import type Tema from "../../../model/Tema"
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

function ListaTemas() {

  const [temas, setTemas] = useState<Tema[]>([])

  const {usuario} = useContext(AuthContext)

  async function buscarTemas() {
    try{
        await buscar('/temas', setTemas, {
          headers: {Authorization: usuario.token}
        })
    } catch(error) {
      alert('Deu ruim')
    }
  }

  useEffect(() => {
    buscarTemas()
  }, [temas])

  console.log(temas);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {temas.map((tema) => (<CardTemas tema={tema} />))}
    </div>
  )
}

export default ListaTemas