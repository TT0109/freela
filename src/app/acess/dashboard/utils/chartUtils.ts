export type VisitData = {
    seguidores: number;
    naoSeguidores: number;
};

export function calcularPorcentagens({ seguidores, naoSeguidores }: VisitData) {
    const total = seguidores + naoSeguidores;
    const seguidoresPercent = Math.round((seguidores / total) * 100);
    const naoSeguidoresPercent = 100 - seguidoresPercent;

    return { seguidoresPercent, naoSeguidoresPercent };
}