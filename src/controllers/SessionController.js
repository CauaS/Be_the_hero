const connection = require('../Database/connection'); 

module.exports = {
    async create(req, resp){
        const { id } = req.body;
        console.log(id);

        const ong =  await connection('ongs')
            .select('name')
            .where('id', id)
            .first();
        
        if(!ong){
            return resp.status(400).json({ error: 'No ONG found with this ID' });
        }

        return resp.json(ong);
    }
}