const { Game, Category, Question } = require('../db/schema')

const GetGames = async (req, res) => {
    try {
        const { page, limit } = req.query
        const offset = page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        const posts = await Game.find()
            .limit(parseInt(limit))
            .skip(offset)
            .sort({ popularity_rating: 'desc' })
        res.send({ results: posts.length, posts })
    } catch (err) {
        throw err
    }
}

const GetGamesByUser = async (req, res) => {
    try {
        const { page, limit } = req.query
        const offset = page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        const posts = await Game.find({ user_id: req.params.user_id })
            .limit(parseInt(limit))
            .skip(offset)
            .sort({ popularity_rating: 'desc' })
        res.send({ results: posts.length, posts })
    } catch (err) {
        throw err
    }
}

const GetGameById = async (req, res) => {
    try {
        const post = await Game.findById(req.params.post_id).populate([
            {
                model: 'users',
                path: 'user_id',
                select: '_id name'
            },
            {
                path: 'categories',
                populate: {
                    path: 'game_id',
                    model: 'games',
                    select: '_id name'
                }
            },
            {
                path: 'questions',
                populate: {
                    path: 'category_id',
                    model: 'categories',
                    select: '_id name'
                }
            }
        ])
        res.send(post)
    } catch (err) {
        throw err
    }
}

const CreateGame = async (req, res) => {
    try {
        const newGame = new Game({ ...req.body, user_id: req.params.user_id })
        newGame.save()
        res.send(newGame)
    } catch (err) {
        throw err
    }
}

const DeleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params._id)
        await Category.deleteMany({ _id: { $in: game.categories } })
        await Question.deleteMany({ _id: { $in: game.questions } })
        await Game.findByIdAndDelete(req.params._id)
        res.send({ msg: `${game.title} deleted` })
    } catch (err) {
        throw err
    }
}

const UpdateGame = async (req, res, err) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params._id,
            { ...req.body },
            { new: true, useFindAndModify: false },
            (err, (d) => (err ? err : res.send(d)))
        )
        res.send(updatedGame)
    } catch (err) {
        throw err
    }
}

module.exports = {
    GetGames,
    GetGameById,
    GetGamesByUser,
    CreateGame,
    UpdateGame,
    DeleteGame
}