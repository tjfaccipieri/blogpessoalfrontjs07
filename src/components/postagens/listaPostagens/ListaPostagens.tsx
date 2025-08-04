import { useNavigate } from "react-router-dom"
import CardPostagens from "../cardPostagens/CardPostagens"
import { useContext, useEffect, useState } from "react"
import type Postagem from "../../../model/Postagem"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar } from "../../../services/Service"

function ListaPostagens() {

  const navigate = useNavigate()

  const [postagens, setPostagens] = useState<Postagem[]>([])

  const {usuario, handleLogout} = useContext(AuthContext)

  async function buscarPostagens() {
    try{
        await buscar('/postagens', setPostagens, {
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
    buscarPostagens()
  }, [postagens])

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {postagens.map((postagem) => (<CardPostagens postagem={postagem} />))} 
    </div>
  )
}

export default ListaPostagens