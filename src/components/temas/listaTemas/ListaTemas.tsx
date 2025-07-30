/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react"
import CardTemas from "../cardTemas/CardTemas"
import type Tema from "../../../model/Tema"
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";

function ListaTemas() {

  const navigate = useNavigate()

  const [temas, setTemas] = useState<Tema[]>([])

  const {usuario, handleLogout} = useContext(AuthContext)

  async function buscarTemas() {
    try{
        await buscar('/temas', setTemas, {
          headers: {Authorization: usuario.token}
        })
    } catch(error: any) {
      if(error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if(usuario.token === '') {
      alert('Sem logar não rola neh')
      navigate('/')
    }
  }, [navigate, usuario.token])

  useEffect(() => {
    buscarTemas()
  }, [temas])

  return (
    <>
      {temas.length === 0 && (<DNA 
        visible={true}
        width={350}
        height={350}
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper mx-auto"
      />)}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {temas.map((tema) => (<CardTemas tema={tema} />))}
    </div>
    </>
  )
}

export default ListaTemas