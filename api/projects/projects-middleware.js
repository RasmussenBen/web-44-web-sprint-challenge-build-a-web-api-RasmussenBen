const Projects = require('./projects-model')

function verifyProject (req, res, next) {
    const { name, des, completed } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({ message: "Name field is required"})
    }
    else if (!des || !des.trim()) {
        res.status(400).json({ message: "Description field is required"})
    }
    req.name = name.trim()
    req.des = des.trim()
    req.completed = completed
    next()
}

async function verifyProjectId (req, res, next) {
    try {
        const { id } = req.params
        const specificProject = await Projects.get(id)
        if (!specificProject) {
            res.status(404).json({ message: "Specific project not found"})
        }
        req.specificProject = specificProject
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    verifyProject,
    verifyProjectId
}