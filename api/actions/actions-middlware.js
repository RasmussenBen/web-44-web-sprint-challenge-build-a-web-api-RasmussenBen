const Actions = require('./actions-model')

async function verifyAction (req, res, next) {
    const { id, des, completed, notes } = req.body
    if (!id) {
        res.status(400).json({
            message: 'Project ID is required'
        })
    }
    else if (!des || !des.trim()) {
        res.status(400).json({
            message: 'Project description is required'
        })
    }
    else if (!notes || !notes.trim()) {
        res.status(400).json({
            message: 'Project notes are required'
        })
    }
    else {
        req.id = id
        req.des = des.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

async function verifyActionId (req, res, next) {
    try {
        const specificAction = await Actions.get(req.params.id)
        if (!specificAction) {
            res.status(404).json({ message: "Specific action not found"})
        }
        req.specificAction = specificAction
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    verifyAction,
    verifyActionId
}