import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";

function Home() {
  return (
    <>
      <div className="w-full bg-sky-700 text-white font-semibold font-mono">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-4xl">Seja Bem Vinde!</h2>
            <p>Expresse aqui seus pensamentos e opniões</p>
            <div className="flex justify-around gap-4">
              <ModalPostagem />
            </div>
          </div>

          <div>
            <img
              src="https://i.imgur.com/VpwApCU.png"
              alt="Imagem da Página Home"
              className="w-96"
            />
          </div>
        </div>
      </div>
      <ListaPostagens />
    </>
  );
}

export default Home;
