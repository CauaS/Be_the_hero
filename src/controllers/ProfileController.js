const connection = require('../Database/connection'); 


module.exports = {
    async index(req, resp){
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .select('*')
            .where('ong_id', ong_id);

        return resp.json(incidents);
    }
}