'use client'

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileSpySelector from "./compoents/ProfileSpySelector";
import { useSearchParmsStore } from "./user/store/searchParams";

export default function Home() {
  const searchParams = useSearchParams();
  const setSearchParams = useSearchParmsStore(state => state.setSearchParams);
  const searchParams2 = useSearchParmsStore(state => state.searchParams);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObject: Record<string, string> = {};
    params.forEach((value, key) => {
        paramsObject[key] = value;
    });
    setSearchParams(paramsObject);
}, [setSearchParams]);

  useEffect(() => {
    console.log("Todos os parâmetros:", searchParams2);
  }, [searchParams2])

  return (
    <div>
      <Suspense fallback={<div>Carregando...</div>}>
        <div className="w-full max-w-sm h-screen bg-gray-100 flex flex-col mx-auto">
          <ProfileSpySelector />
        </div>
      </Suspense>
    </div>

  );
}
