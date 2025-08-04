// import { Link } from 'react-router-dom';
import type Postagem from '../../../model/Postagem';

interface cardPostagemProps {
  postagem: Postagem;
}

function CardPostagens({ postagem }: cardPostagemProps) {
  return (
    <div className="border-2 rounded-lg overflow-hidden shadow-sky-900 shadow-md">
      <div className="flex gap-4 items-center bg-sky-800 p-2">
        <img
          src={postagem.usuario?.foto || 'https://ik.imagekit.io/2zvbvzaqt/usuario.png'}
          onError={(e) => e.currentTarget.src = 'https://ik.imagekit.io/2zvbvzaqt/usuario.png'}
          alt="Foto do dono da postagem"
          className="w-8 rounded-full"
        />
        <h2 className="font-bold text-sky-100">{postagem.usuario?.nome}</h2>
      </div>
      <div className="px-2">
        <h3 className="font-semibold text-sky-800">{postagem.titulo}</h3>
        <p className="text-sm">{postagem.texto}</p>
        <p className="text-sm">tema: {postagem.tema?.descricao}</p>
        <p className="text-sm">
          data:{' '}
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: 'full',
            timeStyle: 'medium',
            timeZone: 'America/Sao_Paulo',
          }).format(new Date(postagem.data))}
        </p>
      </div>
      {/* <div className="flex w-full text-white font-semibold">
        <Link
          to={`/editarPostagem/${postagem.id}`}
          className="bg-sky-600 hover:bg-sky-800 w-full py-1 cursor-pointer text-center"
        >
          Editar
        </Link>
        <Link
          to={`/deletarPostagem/${postagem.id}`}
          className="bg-red-600 hover:bg-red-800 w-full py-1 cursor-pointer text-center"
        >
          Deletar
        </Link>
      </div> */}
    </div>
  );
}

export default CardPostagens;
