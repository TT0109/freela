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
    const paramsObj: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    setSearchParams(paramsObj);
    console.log("Todos os parâmetros:", searchParams2);
  }, [searchParams]);

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
