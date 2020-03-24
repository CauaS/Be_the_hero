const connection = require('../Database/connection'); 
const crypto = require('crypto');

module.exports = {
    async create(req, resp){
        const { name, email, whatsapp, city, uf } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id, 
            name,
            email, 
            whatsapp, 
            city, 
            uf
        })
    
        resp.json({ id })
    },

    async index(req, resp) {
        const ongs = await connection('ongs').select('*');

        return resp.json( ongs );
    }
}