'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { emailStore } from "../user/store/emailStore";
import { PiDetective } from "react-icons/pi";
import { useSearchParmsStore } from "../user/store/searchParams";

export default function LoginPage({ searchParams }: { searchParams: any }) {
  const [inputEmail, setInputEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = emailStore((state: any) => state);
  const router = useRouter();

  const isValidEmail = (email: string) => {
    // Regex simples e confiável para validar e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!isValidEmail(inputEmail)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      setLoading(true);
      setError(""); // Limpa erro anterior
      // await login(inputEmail);
      router.push("/acess");
    } catch (err) {
      console.error("Erro no login", err);
      setError("Não foi possível realizar o login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const setSearchParams = useSearchParmsStore(state => state.setSearchParams);
  const searchParams2 = useSearchParmsStore(state=> state.searchParams);
  const getQueryString = useSearchParmsStore(state=> state.getQueryString);

  useEffect(() => {
    const paramsObj: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    setSearchParams(paramsObj);
    console.log("Todos os parâmetros:", getQueryString());
  }, [searchParams]);

  return (
    <div>
    <Suspense fallback={<div>Carregando...</div>}>
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <PiDetective size={80} className="text-orange-400 mb-8" />

      <h1 className="text-2xl font-bold text-center mb-2">
        Faça Login para <br /> entrar em sua conta.
      </h1>

      <p className="text-sm text-center text-gray-400 mb-6">
        Utilize o <span className="text-white font-medium">mesmo e-mail</span> cadastrado na<br />
        realização de sua <span className="text-white font-medium">compra</span>.
      </p>

      <input
        type="email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        placeholder="Ex: seuemail@gmail.com"
        className="w-full max-w-md rounded-md border border-gray-600 bg-black text-white px-4 py-3 mb-2 focus:outline-none"
      />

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-500 text-sm mb-4 max-w-md text-center">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full max-w-md bg-gradient-to-r from-orange-400 to-pink-500 text-black font-semibold py-3 rounded-md hover:opacity-90 transition"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-sm text-center text-gray-400 mt-6">
        Você sempre poderá <span className="text-white font-medium">acessar</span> essa plataforma<br />
        usando o <span className="text-white font-medium">link</span> de acesso enviado em seu <span className="text-white font-medium">e-mail</span>.
      </p>
    </div>
    </Suspense>
    </div>
  );
}
