/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import type Usuario from '../../model/Usuario';
import { buscar } from '../../services/Service';
import { TrashIcon } from '@phosphor-icons/react';

function PerfilPlus() {
  // para essa tela de perfil, iremos trabalhar pegando o ID do usuario da URL do navegador, para conseguir fazer um get do usuario
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // trazendo a context, pra poder pegar o token, sem ele, não rola de fazer o GET
  const { usuario } = useContext(AuthContext);
  // estado onde iremos gaurdar o usuário que está vindo do backend
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({} as Usuario);

  // função que vai buscar o usuario no backend, funciona bem parecido com as funções de pegar o tema ou a postagem pelo ID
  async function getUserById() {
    try {
      await buscar(`/usuarios/${id}`, setUsuarioLogado, {
        headers: { Authorization: usuario.token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        alert('Tem q estar logado');
        navigate('/');
      }
    }
  }

  // useEffect que vai rodar a função acima, assim que o componente carregar
  useEffect(() => {
    getUserById();
  }, [id]);

  return (
    <div className="container mx-auto my-10 flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-sky-900 font-bold text-4xl">
          Dados de perfil
        </h2>
        <div className="flex gap-8 mt-4 items-center">
          <img
            src={usuarioLogado.foto}
            alt=""
            className="border-4 border-sky-800 rounded-2xl w-56"
          />
          <div className="">
            <p className="font-semibold text-sky-900 text-3xl">
              {usuarioLogado.nome}
            </p>
            <p className="font-semibold text-sky-900 text-lg">
              {usuarioLogado.usuario}
            </p>
            <p className="font-semibold text-sky-900 text-lg">
              Total de postagens: {usuarioLogado.postagem?.length}
            </p>
          </div>
        </div>
        <hr className="border-sky-900 border w-full my-4" />
        <h2 className="text-center text-sky-900 font-bold text-4xl">
          Minhas postagens
        </h2>

        {/* aqui em baixo, eu pego o Array de postagens que o usuário tem, por causa do relacionamento do backend, e rodo um map, pra poder gerar um card para cada postagem feita por esse usuário
        */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
          {usuarioLogado.postagem?.map((postagem) => (
            <div className="border-2 rounded-lg overflow-hidden shadow-sky-900 shadow-md">
              <div className="flex gap-4 items-center bg-sky-800 p-2">
                <img
                  src={
                    usuarioLogado.foto ||
                    'https://ik.imagekit.io/2zvbvzaqt/usuario.png'
                  }
                  onError={(e) =>
                    (e.currentTarget.src =
                      'https://ik.imagekit.io/2zvbvzaqt/usuario.png')
                  }
                  alt="Foto do dono da postagem"
                  className="w-8 rounded-full"
                />
                <h2 className="font-bold text-sky-100">
                  {usuarioLogado.nome}
                </h2>
              </div>
              <div className="px-2">
                <h3 className="font-semibold text-sky-800">
                  {postagem.titulo}
                </h3>
                <p className="text-sm">{postagem.texto}</p>
                <p className="text-sm">
                  data:{' '}
                  {new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                    timeZone: 'America/Sao_Paulo',
                  }).format(new Date(postagem.data))}
                </p>
              </div>
              <div className="flex w-full text-white font-semibold">
                <Link
                  to={`/editarPostagem/${postagem.id}`}
                  className="bg-sky-600 hover:bg-sky-800 w-full py-1 cursor-pointer text-center"
                >
                  Editar
                </Link>
                <Link
                  to={`/deletarPostagem/${postagem.id}`}
                  className="bg-red-600 hover:bg-red-800 w-full py-1 cursor-pointer text-center flex items-center justify-center gap-4"
                >
                  <TrashIcon /> Deletar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerfilPlus;
