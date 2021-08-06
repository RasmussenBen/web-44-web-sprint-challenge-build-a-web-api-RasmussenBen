const express = require('express')
const Actions = require('./actions-model')
const { verifyAction, verifyActionId } = require('./actions-middlware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const action = await Actions.get()
            res.status(200).json(action)
    } catch (err) {
            next(err)
    }
})

router.get('/:id', verifyActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', verifyAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', verifyActionId, verifyAction, (req, res, next) => {
    Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
    .then(() => {
        return Actions.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', verifyActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(res.Action)
    }
    catch(err) {
        next(err)
    }
})

module.exports = router