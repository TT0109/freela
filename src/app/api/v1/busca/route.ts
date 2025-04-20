import db from "@/app/config/db";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, username } = body;

    if (!email && !username) {
        return new Response(JSON.stringify({ error: "Parâmetro 'email' e username é obrigatório." }), {
            status: 400,
        });
    }

    const insertBusca = (idEmailBuscou: number, username: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO TbBusca (idEmailBuscou, username) VALUES (?,?)`, [idEmailBuscou, username], function (err) {
                if (err) return reject(err);
                resolve({ lastID: this.lastID });
            });
        });
    };

    const insertHistorico = (idBusca: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO TbHistorico (idBusca) VALUES (?)`, [idBusca], function (err) {
                if (err) return reject(err);
                resolve({ lastID: this.lastID });
            });
        });
    };

    try {
        const resultBusca = await insertBusca(email, username);
        const resultHistorico = await insertHistorico(resultBusca.lastID);
        
        return new Response(JSON.stringify({ success: true, resultBusca, resultHistorico }), {
            status: 201,
        });
    } catch (err: any) {
        console.error("Erro ao verificar/inserir email:", err.message);
        return new Response(JSON.stringify({ error: "Erro interno no login." }), {
            status: 500,
        });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get("idEmail");

    if (!emailId) {
        return new Response(JSON.stringify({ error: "Parâmetro 'idEmail' é obrigatório." }), {
            status: 400,
        });
    }

    const getBuscaEHistorico = (idEmailBuscou: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.get(
                `
                SELECT 
                    b.id AS buscaId,
                    b.username,
                    h.id AS historicoId,
                    h.resultadoQtd,
                    h.dataExecucao
                FROM TbBusca b
                LEFT JOIN TbHistorico h ON b.id = h.idBusca
                WHERE b.idEmailBuscou = ?
                ORDER BY h.dataExecucao DESC
                `,
                [idEmailBuscou],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row); // Apenas 1 resultado
                }
            );
        });
    };

    try {
        const resultado = await getBuscaEHistorico(Number(emailId));
        return new Response(JSON.stringify({ data: resultado }), {
            status: 200,
        });
    } catch (err: any) {
        console.error("Erro ao buscar dados:", err.message);
        return new Response(JSON.stringify({ error: "Erro ao buscar dados." }), {
            status: 500,
        });
    }
}