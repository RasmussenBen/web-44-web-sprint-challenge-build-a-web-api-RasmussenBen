const Actions = require('./actions-model')

async function verifyAction (req, res, next) {
    const { project_id, description, completed, notes } = req.body
    if (!project_id) {
        res.status(400).json({
            message: 'Action ID is required'
        })
    }
    else if (!description || !description.trim()) {
        res.status(400).json({
            message: 'Action description is required'
        })
    }
    else if (!notes || !notes.trim()) {
        res.status(400).json({
            message: 'Action notes are required'
        })
    }
    else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

async function verifyActionId (req, res, next) {
    try {
        const specificAction = await Actions.get(req.params.id)
        if (!specificAction) {
            next({
                status: 404,
                message: 'Specific action not found'
            })
        }
        req.specificAction = specificAction
        next()
    }
    catch (err) {
        res.status(500).json({ message: "Error finding requested action" })
    }
}

module.exports = {
    verifyAction,
    verifyActionId
}