const connection = require('../Database/connection'); 

module.exports = {
    async create(req, resp){
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        

        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value,
            ong_id
        });

        return resp.json({ id })
    },

    async index(req, resp){
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count('id');

        resp.header('X-Total-Count', count['count(*)']);

        console.log(count);

        const incidents =  await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') 
        .limit(5)
        .offset((page -1)*5)
        .select(['incidents.*',
                 'ongs.name', 
                 'ongs.email', 
                 'ongs.whatsapp', 
                 'ongs.city', 
                 'ongs.uf']);


        return resp.json(incidents);
    },

    async delete(req, resp){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .select('ong_id')
            .where('id', id)
            .first();

        if(incident.ong_id != ong_id){
            return resp.status(401).json('Operation not allowed!');
        }

        await connection('incidents').where('id', id).delete();

        return resp.status(204).send();
    }
}