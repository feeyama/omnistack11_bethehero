const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    //Lista todas as ongs
    async index(request, response){
        //Paginação
        const { page = 1} = request.query;
        //Total de registros
        const [count] = await connection('incidents').count();
        //console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) //Limita em 5 registros 
        //Primeira pagina não deve pular nada e pega os primeiros 5 registros
        .offset((page - 1) * 5) //Pular 5 primeiros registros e pega mais 5
        .select([
            'incidents.*', 
            'ongs.name',
            'ongs.whatsapp', 
            'ongs.email', 
            'ongs.city',
            'ongs.uf'
        ]);
        //.select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    //Deleta um caso
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
            
        if (incident.ong_id != ong_id)
        {
            return response.status(401).json({ error: 'Operation not permitted. '});
        }

        await connection('incidents').where('id', id).delete();
        //Resposta com sucesso mas sem conteudo
        return response.status(204).send();
    },

    async create(request, response){
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;
        //Grava em um 'array' de uma posição
        // const result = await connection('incidents').insert({
        //     title,
        //     description,
        //     value,
        //     ong_id
        // });

        // const id = result[0]; //Retorna a primeira posição 
        //ou
        const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
        });

        return response.json({ id });
    }
};