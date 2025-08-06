import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import FormTema from './components/temas/formTema/FormTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens';
import FormPostagem from './components/postagens/formPostagem/FormPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import Perfil from './pages/perfil/Perfil';
import PerfilPlus from './pages/perfilPlus/PerfilPlus';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AuthProvider>
        {/* ó, aqui dentro, vai rolar navegação */}
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <div className="min-h-[80vh]">
            {/* ó, aqui são as rotas unicas */}
            <Routes>
              {/* cada rota tem: Caminho (path), quem abre (element) */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastrarTema" element={<FormTema />} />
              <Route path="/editarTema/:id" element={<FormTema />} />
              <Route path="/deletarTema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastrarPostagem" element={<FormPostagem />} />
              <Route path="/editarPostagem/:id" element={<FormPostagem />} />
              <Route path='/deletarPostagem/:id' element={<DeletarPostagem />} />
              <Route path='/perfil' element={<Perfil />} />
              <Route path='/perfilplus/:id' element={<PerfilPlus />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
