const goalRouter = require('express').Router()
const db = require('APP/db')
const Goal = db.model('goal')


//Get all the goals
goalRouter.get('/', function (req, res, next) {
    Goal.findAll()
        .then((allGoals) => {
            res.status(200).json(allGoals)
        })
        .catch(next);
})

// //Get one goal  
goalRouter.get('/:id', (req, res, next) => {
      Goal.findById(req.params.id)
        .then(function (goal) {
            if (!goal) {
                res.sendStatus(404);
            }
            res.status(201).send(goal)
        })
        .catch(next)
})

//Add a goal
goalRouter.post('/newgoal', function (req, res, next) {
    Goal.create(req.body)
        .then(newGoal => {
            res.status(200).send(newGoal)
        })
        .catch(next)
});

//Update goal info for one goal 
goalRouter.put('/:id', function (req, res, next) {
    Goal.findById(req.params.id)
        .then(function (goal) {
            return goal.update(req.body)
        })
        .then(function(newGoal){
            res.status(201).send(newGoal)
        })
        .catch(next)
});

//Delete one goal 
goalRouter.delete('/:id', function (req, res, next) {
    Goal.findById(req.params.id)
        .then(function (goal) {
            return goal.destroy()
        })
        .then(function(){
            res.send('You have achieved your goal!')
        })
        .catch(next)
});





module.exports = goalRouter;