const express = require('express');
const SessionController = require('./controllers/SessionController');
const TaskController = require('./controllers/TaskController');
const Auth = require('./middleware/Auth');

const routes = express.Router();

routes.post('/register', SessionController.store);
routes.post('/auth', SessionController.auth);

routes.use(Auth);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.get('/tasks/:taskId', TaskController.search);
routes.put('/tasks/:taskId', TaskController.update);
routes.delete('/tasks/:taskId', TaskController.destroy);
routes.put('/tasks/recycle/:taskId', TaskController.recycle);


module.exports = routes;