const { Question, Game, Category } = require('../db/schema')

const GetQuestionsByCategory = async (req, res) => {
    try {
        const questions = await Comment.find({ category_id: req.params.category_id })
        res.send(questions)
    } catch (error) {
        throw error
    }
}

const CreateQuestion = (req, res) => {
    try {
        const cat = await Category.findById(req.params.category_id)
        const question = new Question({ ...req.body, category_id: req.params.category_id, game_id: cat.game_id})
        question.save()
        await Category.update(
            { _id: req.params.category_id },
            {
                $push: {
                    questions: question
                }
            }
        )
        await Game.update(
            { _id: cat.game_id },
            {
                $push: {
                    questions: question
                }
            }
        )
        res.send(question)
    } catch (error) {
        throw error
    }
}

const DeleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.question_id)
        await Question.deleteOne({ _id: req.params.question_id })
        await Category.findOneAndUpdate(
            { _id: question.category_id },
            { $pull: { questions: req.params.question_id } },
            { upsert: true, new: true },
            (err, updatedCat) => {
                if (err) { console.log(err) }
                res.send(updatedCat)
            }
        )
        await Game.findOneAndUpdate(
            { _id: question.game_id },
            { $pull: { questions: req.params.question_id } },
            { upsert: true, new: true },
            (err, updatedGame) => {
                if (err) { console.log(err) }
                res.send(updatedGame)
            }
        )
    } catch (error) {
        throw error
    }
}

const UpdateQuestion = async (req, res) => {
    try {
        await Question.findByIdAndUpdate(
            req.params.question_id,
            { ...req.body },
            { upsert: true, new: true },
            (err, d) => (err ? err : res.send(d))
        )
    } catch (error) {
        throw error
    }
}

module.exports = {
    GetQuestionsByCategory,
    CreateQuestion, 
    UpdateQuestion,
    DeleteQuestion
}