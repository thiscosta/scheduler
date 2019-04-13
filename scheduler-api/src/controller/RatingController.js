const Ratings = require('../models/Rating')
const Establishments = require('../models/Establishment')

class Rating {
    async index(req, res){
        const establishment = await Establishments.findById(req.params.id).populate('ratings')
        
        return res.json(establishment.ratings)
    }

    async show(req, res){
        const rating = await Ratings.findById(req.params.id)

        return res.json(rating)
    }

    async store(req, res){
        const establishment = await Establishments.findById(req.params.id)

        const rating = await Ratings.create({
            user: req.body.user,
            rating: req.body.rating,
            establishment: establishment.id,
            comment: req.body.comment
        })

        establishment.ratings.push(rating)

        await establishment.save()

        return res.json(rating);
    }

    async update(req, res){
        const rating = await Ratings.findOneAndUpdate(req.params.id, req.body, { new: true })

        return res.json(rating);
    }

    async destroy(req, res){
        await Ratings.findOneAndDelete(req.params.id)

        return res.send();
    }
}

module.exports = new Rating()