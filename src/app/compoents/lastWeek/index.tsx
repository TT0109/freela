'use client'

import { useState, useEffect, useCallback } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { CiClock1 } from "react-icons/ci";
import VisitantesCards from './Card';
import { getLastWeekDates } from "@/app/actions/getLastWeekDates";

export default function LastWeek() {
    const [datasSemana, setDatasSemana] = useState<{ inicio: string; fim: string } | null>(null);

    const getDates = useCallback(async () => {
        const { inicio, fim } = await getLastWeekDates();
        setDatasSemana({ inicio, fim });
    }, []);

    useEffect(() => {
        getDates();
    }, [getDates]);

    return (
        <div className="max-w-lg mx-auto mt-8 text-center font-sans">
            <div className="rounded-full py-2 px-4 mb-4 bg-red-100 text-red-600 inline-flex items-center justify-center gap-2">
                <FaExclamationTriangle className="text-red-600" />
                <span className="text-sm font-medium">Não saia dessa página.</span>
            </div>

            <p className="text-sm text-gray-700 mb-2">
                Liberamos apenas <strong>UMA PRÉVIA</strong> por aparelho.
            </p>

            <div className="flex items-center justify-center gap-2 mt-4">
                <CiClock1 className="text-gray-600" />
                <div className="text-left">
                    <span className="block text-sm font-semibold">Última semana</span>
                    <div className="text-xs text-gray-500">
                        {datasSemana ? `${datasSemana.inicio} - ${datasSemana.fim}` : 'Carregando datas...'}
                    </div>
                </div>
            </div>

            <span className="block mt-4 font-bold">
                Visitaram seu perfil essa semana de 2 à 7 vezes.
            </span>

            <VisitantesCards />
        </div>
    );
}
