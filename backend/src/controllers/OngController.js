const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    //Lista todas as ongs
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    
    //Cria uma ongs nova
    async create(request, response) {
        //Pega a entrada em uma variável só
        //const data = request.body;
        //pegar cada valor em uma variavel
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        //Mostra no console
        //console.log(data);
    return response.json({ id });
    }
}