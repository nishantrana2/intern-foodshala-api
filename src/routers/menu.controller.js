import express from 'express';
const router = express.Router();

const setup = require("../services/menu.service");


router.post('/addMenu', menu);
router.get('/', fetch);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/:id', fetchByClientId);

function fetchByClientId(req, res, next) {
    setup
        .fetchByClient(req.params.id)
        .then((menu) => res.json(menu))
        .catch((err) => next(err));
}


function fetch(req, res, next) {
    setup
        .fetch()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function update(req, res, next) {
    setup
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}



function _delete(req, res, next) {
    setup
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch((err) => next(err));
}


function menu(req, res, next) {
    setup
        .create(req.body)
        .then((menu) => res.json(menu))
        .catch((err) => next(err));
}

module.exports = router;