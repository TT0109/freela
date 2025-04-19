import { FiChevronDown } from 'react-icons/fi';

const HeaderInstagramAlert = () => {
  return (
    <div className="w-full text-center px-4">
      <h2 className="text-xl font-semibold mb-2">
        <span className="text-orange-600 font-bold">Prints</span> recuperados
      </h2>
      <p className="text-sm text-gray-700">
        Nossa inteligência artificial procurou por <span className="font-semibold">todo o Instagram</span> atrás de conversas
        que mencionam o <span className="font-semibold">seu nome</span>
      </p>

      <hr className="my-3 border-gray-200 w-3/5 mx-auto" />

      <p className="text-lg font-semibold text-gray-800 mt-2">
        Tem amigos querendo se afastar de você
      </p>
      <p className="text-sm text-gray-600">
        Detectamos <span className="font-bold text-orange-600">3x</span> a palavra{" "}
        <span className="font-bold">"afastar"</span> nos últimos 7 dias
      </p>

      {/* Indicador para baixo */}
      <div className="flex justify-center items-center mt-3 mb-2">
        <div className="bg-orange-500 text-white p-1 rounded-full animate-bounce">
          <FiChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default HeaderInstagramAlert;
