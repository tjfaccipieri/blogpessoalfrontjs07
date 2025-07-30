import { Link } from 'react-router-dom';
import type Tema from '../../../model/Tema';

interface cardTemaProps {
  tema: Tema;
}

function CardTemas({ tema }: cardTemaProps) {
  return (
    <div className="border-2 rounded-lg overflow-hidden shadow-sky-900 shadow-md">
      <h2 className="bg-sky-800 text-white text-xl font-bold px-4 py-2">
        Tema
      </h2>
      <p className="bg-gray-300 px-4 py-4 text-lg font-mono">
        {tema.descricao}
      </p>
      <div className="flex w-full text-white font-semibold">
        <Link
          to={`/editarTema/${tema.id}`}
          className="bg-sky-600 hover:bg-sky-800 w-full py-1 cursor-pointer text-center"
        >
          Editar
        </Link>
        <Link
          to={`/deletarTema/${tema.id}`}
          className="bg-red-600 hover:bg-red-800 w-full py-1 cursor-pointer text-center"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardTemas;
