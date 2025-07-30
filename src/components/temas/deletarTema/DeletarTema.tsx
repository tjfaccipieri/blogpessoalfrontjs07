/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../model/Tema';
import { buscar, deletar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function DeletarTema() {
  const navigate = useNavigate();
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  console.log(id);

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: usuario.token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  function retornar() {
    navigate('/temas');
  }

  async function deletarTema() {
    setIsLoading(true)
    try {
      await deletar(`/temas/${id}`, {
        headers: {Authorization: usuario.token}
      })
      alert('Foi de vala')
      retornar()
    } catch (error: any) {
      if(error.toString().includes('401')) {
        handleLogout()
      }
    }
    setIsLoading(false)
  }

  console.log(tema);

  useEffect(() => {
    if (usuario.token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [usuario.token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  return (
    <div className="container mx-auto py-4 flex flex-col gap-4 items-center">
      <h2 className='font-bold text-sky-900 text-5xl'>Deletar tema</h2>
      <p className='font-semibold text-sky-900 text-lg'>Você tem certeza de que deseja apagar o tema a seguir?</p>
      <div className="border-2 rounded-lg overflow-hidden shadow-sky-900 shadow-md w-1/3 mx-auto">
        <h2 className="bg-sky-800 text-white text-xl font-bold px-4 py-2">
          Tema
        </h2>
        <p className="bg-gray-300 px-4 py-4 text-lg font-mono">
          {tema.descricao}
        </p>
        <div className="flex w-full text-white font-semibold">
          <button className="w-full bg-red-600 hover:bg-red-800 py-2" onClick={retornar}>
            Não
          </button>
          <button className="w-full bg-sky-600 hover:bg-sky-800 py-2 flex justify-center" onClick={deletarTema}>
            {isLoading ? <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0,75' width='24' /> : 'Sim'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
