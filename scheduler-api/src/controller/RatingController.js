const mongoose = require('mongoose')

const Ratings = mongoose.model('Rating')

module.exports = {
    async index(req, res){
        const ratings = await Ratings.paginate({ /*filtros*/ }, { page: 1, limit: 10 } )

        return res.json(ratings)
    },

    async show(req, res){
        const rating = await Ratings.findById(req.params.id)

        return res.json(rating)
    },

    async store(req, res){
        const rating = await Ratings.create(req.body)

        return res.json(rating);
    },

    async update(req, res){
        const rating = await Ratings.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(rating);
    },

    async destroy(req, res){
        await Ratings.findOneAndDelete(req.params.id)

        return res.send();
    },
}