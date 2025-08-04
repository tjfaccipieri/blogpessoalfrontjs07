import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Postagem from '../../../model/Postagem';
import { buscar, deletar } from '../../../services/Service';

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);

  async function getPostagemById(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: { Authorization: usuario.token },
    });
  }

  useEffect(() => {
    getPostagemById(id!);
  }, [id]);

  useEffect(() => {
    if(usuario.token === '') {
      alert('Precisa estar logado né meu fio')
      navigate('/')
    }
  }, [usuario.token])

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
      headers: { Authorization: usuario.token },
    });
    } catch (error) {
      if(error.toString().includes('401')) {
        handleLogout()
      } else {
        alert('Erro ao deletar essa postagem')
      }
    }
  }

  return (
    <div className="container mx-auto my-10">
      <h2 className='text-sky-900 font-bold text-center text-5xl'>Deletar Postagem</h2>
      <p className='text-sky-900 text-center font-semibold mt-4'>Tem certeza de que quer apagar a postagem:</p>

      <div className='w-1/3 mx-auto mt-6'>
        <div className="border-2 rounded-lg overflow-hidden shadow-sky-900 shadow-md">
          <div className="flex gap-4 items-center bg-sky-800 p-2">
            <img
              src={
                postagem.usuario?.foto ||
                'https://ik.imagekit.io/2zvbvzaqt/usuario.png'
              }
              onError={(e) =>
                (e.currentTarget.src =
                  'https://ik.imagekit.io/2zvbvzaqt/usuario.png')
              }
              alt="Foto do dono da postagem"
              className="w-8 rounded-full"
            />
            <h2 className="font-bold text-sky-100">{postagem.usuario?.nome}</h2>
          </div>
          <div className="px-4 py-2">
            <h3 className="font-semibold text-sky-800">{postagem.titulo}</h3>
            <p className="text-sm">{postagem.texto}</p>
            <p className="text-sm">tema: {postagem.tema?.descricao}</p>
          </div>
          <div className="flex w-full text-white font-semibold"></div>
        </div>
      </div>

      <div className='w-1/3 mx-auto flex gap-4 justify-center mt-10'>
        <button className='bg-sky-600 hover:bg-sky-800 text-white font-bold px-4 py-2 rounded-lg' onClick={() => navigate('/postagens')}>Cancelar</button>
        <button className='bg-red-600 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-lg' onClick={deletarPostagem}>Apagar</button>
      </div>
    </div>
  );
}

export default DeletarPostagem;
