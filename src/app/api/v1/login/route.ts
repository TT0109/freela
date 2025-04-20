import db from "@/app/config/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "Parâmetro 'email' é obrigatório." }), {
      status: 400,
    });
  }

  const getEmail = (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT id, email FROM TbEmails WHERE email = ?`, [email], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  };

  const insertEmail = (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO TbEmails (email) VALUES (?)`, [email], function (err) {
        if (err) return reject(err);
        resolve({ lastID: this.lastID });
      });
    });
  };

  try {
    const existing = await getEmail(email);

    if (existing) {
      return new Response(JSON.stringify({ success: true, id: existing.id, email: existing.email }), {
        status: 200,
      });
    }

    const result = await insertEmail(email);

    return new Response(JSON.stringify({ success: true, id: result.lastID, email }), {
      status: 201,
    });
  } catch (err: any) {
    console.error("Erro ao verificar/inserir email:", err.message);
    return new Response(JSON.stringify({ error: "Erro interno no login." }), {
      status: 500,
    });
  }
}
