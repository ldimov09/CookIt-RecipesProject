const authController = require('express').Router();
const { get } = require('mongoose');
const { login, register, getAllUsers, verifyToken } = require('../services/authService.js')

authController.post('/login', async (req, res) => {
    try {

        const body = req.body;

        console.log(body)
        const token = await login(body)

        res.send({
            success: true,
            result: token,
        });
    } catch (err) {

        console.log(err.message)
        res.send({
            success: false,
            message: err.message,
        })
    }
})

authController.post('/register', async (req, res) => {
    try {

        const body = req.body;

        const token = await register(body)

        res.send({
            success: true,
            result: token,
        });
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
        })
    }

})

authController.get('/users', async (req, res) => {
    try{
        const result = await getAllUsers();
        res.send({
            success: true,
            result: result,
        });

    }catch(err){
        res.send({
            success: true,
            error: err.message,
        });
    }
})

authController.get('/verify/:token', async (req, res) => {
    try{
        res.send(verifyToken(req.params.token));
    }catch(err) {
        res.send('Error' + err.message)
    }
})

module.exports = authController;
