const express = require("express");
const router = express.Router();
const setup = require("../services/client.service");


router.post("/authenticate", auth);
router.post("/register", signup);
router.get("/", fetch);
router.get("/current", fetchIt);
router.get("/:id", fetchById);
router.put("/:id", update);
router.delete("/:id", _delete);



function signup(req, res, next) {
    setup
        .create(req.body)
        .then((client) => {
            res.json({});
        })
        .catch((err) => next(err));
}

function fetch(req, res, next) {
    setup
        .fetch()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function fetchIt(req, res, next) {
    setup
        .fetchById(req.user.sub)
        .then((user) => (user ? res.json(user) : res.sendStatus(404)))
        .catch((err) => next(err));
}



function update(req, res, next) {
    setup
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}

function auth(req, res, next) {
    setup
        .auth(req.body)
        .then((user) => {
            user
                ? res.json(user)
                : res
                    .status(400)
                    .res.json({
                        message: "Username or password is incorrect",
                    });
        })
        .catch((err) => {
            next(err);
        });
}
function fetchById(req, res, next) {
    setup
        .fetchById(req.params.id)
        .then((user) => (user ? res.json(user) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function _delete(req, res, next) {
    setup
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch((err) => next(err));
}

module.exports = router;