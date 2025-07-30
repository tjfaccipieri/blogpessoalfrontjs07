import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../model/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function FormTema() {
  const navigate = useNavigate();
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { usuario, handleLogout } = useContext(AuthContext);
  const {id} = useParams<{id: string}>()
  

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {Authorization: usuario.token}
      })
    } catch (error: any) {
      if(error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate('/temas')
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if(id !== undefined) {
      try {
        await atualizar('/temas', tema, setTema, {
          headers: {Authorization: usuario.token}
        })
        alert('O tema foi atualizado...')
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          alert('Erro ao atualizar o tema')
        }
      }
    } else {
      try {
        await cadastrar('/temas', tema, setTema, {
          headers: {Authorization: usuario.token}
        })
        alert('O tema foi cadastrado...')
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          alert('Erro ao cadastrar o tema')
        }
      }
    }

    setIsLoading(false)
    retornar()
  }

  useEffect(() => {
    if (usuario.token === '') {
      alert('Sem logar não rola neh');
      navigate('/');
    }
  }, [usuario.token]);

  useEffect(() => {
    if(id !== undefined) {
      buscarPorId(id)
    }
  }, [id])



  return (
    <div className="container mx-auto py-4">
      <h2 className="font-bold text-sky-900 text-5xl text-center">
        {id === undefined ? 'Cadastrar' : 'Atualizar'} Tema
      </h2>
      <form className="w-1/2 mx-auto mt-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="descricao"
            className="font-semibold text-lg text-sky-900"
          >
            Descrição:
          </label>
          <input
            id="descricao"
            name="descricao"
            type="text"
            placeholder="Digite a descrição do novo tema..."
            className="border-sky-900 text-sky-950 border-2 rounded-lg px-4 py-2 text-lg font-semibold"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button className="mx-auto w-1/2 bg-sky-600  mt-8 py-2 text-lg font-bold text-white uppercase rounded-xl hover:bg-sky-800 cursor-pointer flex justify-center">
          {
            isLoading 
            ? <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0,75' width='24' /> 
            : <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          }
        </button>
      </form>
    </div>
  );
}

export default FormTema;
