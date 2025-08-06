import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {
  const data = new Date().getFullYear();

  const {usuario} = useContext(AuthContext)

  return (
    <>
      <div className="flex justify-center bg-sky-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>
          <p className="text-lg">Acesse nossas redes sociais</p>
          {usuario.token !== '' ? (
            <div className="flex gap-2">
            <LinkedinLogoIcon size={48} weight="bold" />
            <InstagramLogoIcon size={48} weight="bold" />
            <FacebookLogoIcon size={48} weight="bold" />
          </div>
          ) : <><p>Loga ai, nunca te pedi nada</p></>}
        </div>
      </div>
    </>
  );
}

export default Footer;
