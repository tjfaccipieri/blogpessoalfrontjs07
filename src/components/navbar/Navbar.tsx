import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

  const navigate = useNavigate()

  const {handleLogout} = useContext(AuthContext)

  function logout() {
    alert('Fica, vai ter bolo...')
    handleLogout()
    navigate('/')
  }

  return (
    <>
      <div
        className="w-full flex justify-center py-4 bg-sky-900 text-white"
      >
        <div className="container flex justify-between text-lg">
          <Link to='/home' className="font-bold font-mono text-2xl">Blog Pessoal</Link>
          <div className="flex gap-4"> 
            <Link to='/postagens' className="hover:underline" >Postagens</Link>
            <Link to='/temas' className="hover:underline" >Temas</Link>
            <Link to='/cadastrarTema' className="hover:underline" >Cadastrar tema</Link>
            <Link to='/perfil' className="hover:underline">Perfil</Link> 
            <Link to='' onClick={logout} className="hover:underline" >Sair</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
