const connections = require('../database/connection')

module.exports = {
    async create(req, res){
        const { id } = req.body

        const ong = await connections('ongs')
        .where('id', id)
        .select('name')
        .first()

        if(ong){
            return res.send(ong)
        }

        return res.status(400).json({ error: "No ONG whit this ID"})
    }
}