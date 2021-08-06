const express = require('express')

const Projects = require('./projects-model')

const router = express.Router()

function checkIdExists(req, res, next) {
    const { id } = req.params
    Projects.findById
}