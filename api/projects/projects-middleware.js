const Projects = require('./projects-model')

function verifyProject (req, res, next) {
    const { name, des } = req.body
    if (!name || !name.trim() || !des || !des.trim()) {
        res.status(400).json({ message: "Both Name and Description fields are required"})
    }
    req.name = name.trim()
    req.des = des.trim()
    next()
}

async function verifyProjectId (req, res, next) {
    try {
        const specificProject = await Projects.get(req.params.id)
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