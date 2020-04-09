import express from 'express';

const router = express.Router();

export let initRouter = (app) => {
    router.get('/', (req, res, next) => {
        res.send('Server is up and running !');
    })
   return app.use('/', router);
}

