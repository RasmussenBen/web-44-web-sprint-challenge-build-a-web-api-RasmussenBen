const express = require('express')
const Projects = require('./projects-model')
const { verifyProject, verifyProjectId } = require('./projects-middleware')
const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then( projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', verifyProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', verifyProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert({
            name: req.name,
            description: req.description,
            completed: req.completed
        })
        res.status(201).json(newProject)
    } 
    catch (error) {
        next(error)
    }
})

router.put('/:id', verifyProjectId, verifyProject, (req, res, next) => {
    Projects.update(req.params.id, {
        name: req.name,
        description: req.description,
        completed: req.completed
    })
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.delete('/:id', verifyProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.project)
    }
    catch(err) {
        next(err)
    }
})

module.exports = router