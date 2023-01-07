const authController = require('express').Router();
const { login, register, getAllUsers } = require('../services/authService.js')

authController.post('/login', async (req, res) => {
    try {

        const body = req.body;

        const token = await login(body)

        res.send({
            succsess: true,
            result: token,
        });
    } catch (err) {
        res.send({
            succsess: false,
            message: err.message,
        })
    }
})

authController.post('/register', async (req, res) => {
    try {

        const body = req.body;

        const token = await register(body)

        res.send({
            succsess: true,
            result: token,
        });
    } catch (err) {
        res.send({
            succsess: false,
            message: err.message,
        })
    }

})

authController.get('/users', async (req, res) => {
    try{
        const result = await getAllUsers();
        res.send({
            succsess: true,
            result: result,
        });

    }catch(err){
        res.send({
            succsess: true,
            error: err.message,
        });
    }
})

module.exports = authController;