const Projects = require('./projects-model')

function verifyProject (req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({ message: "Name field is required"})
    }
    else if (!description || !description.trim()) {
        res.status(400).json({ message: "Description field is required"})
    }
    req.name = name.trim()
    req.description = description.trim()
    req.completed = completed
    next()
}

async function verifyProjectId(req, res, next) { 
    try {
        const { id } = req.params
        const project = await Projects.get(id)
        if (project) {
            req.project = project
                next()
    } else {
            next({
                status: 404,
                message: 'Specific project not found'
    })
    }
        } catch (err) {
            next(err)
    }
}

module.exports = {
    verifyProject,
    verifyProjectId
}