const recipeController = require('express').Router();
const { getAll, getById, createRecipe, createTag, getAllTags } = require('../services/recipeService');

recipeController.get('/recipes', async (req, res) => { 
    try{
        const result = await getAll();
        res.send({
            success: true,
            result: result,
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message,
        });
    }
})


recipeController.post('/recipes/create', async (req, res) => {
    
    try {
        const result = await createRecipe(req.body);
        res.send({
            sucsess: true,
            result: result
        });
    } catch (err) {
        res.send({
            sucsess: false,
            error: err.message
        })
    }
})


recipeController.post('/tag/create', async (req, res) => {
    
    try {
        const result = await createTag(req.body);
        res.send({
            sucsess: true,
            result: result
        });
    } catch (err) {
        res.send({
            sucsess: false,
            error: err.message
        })
    }
})

recipeController.get('/tags', async (req, res) => {
    
    try {
        const result = await getAllTags(req.body);
        res.send({
            sucsess: true,
            result: result
        });
    } catch (err) {
        res.send({
            sucsess: false,
            error: err.message
        })
    }
})




module.exports = recipeController;