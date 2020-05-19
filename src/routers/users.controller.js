const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");


router.post("/authenticate", auth);
router.post("/register", signup);
router.get("/", fetch);
router.get("/current", fetchIt);
router.get("/:id", fetchById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function auth(req, res, next) {
    userService
        .auth(req.body)
        .then((user) => {
            user
                ? res.json(user)
                : res
                    .status(400)
                    .json({ message: "Username or password is incorrect" });
        })
        .catch((err) => {
            next(err);
        });
}

function signup(req, res, next) {
    userService
        .create(req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}

function fetch(req, res, next) {
    userService
        .fetch()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function fetchIt(req, res, next) {
    userService
        .fetchById(req.user.sub)
        .then((user) => (user ? res.json(user) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function fetchById(req, res, next) {
    userService
        .fetchById(req.params.id)
        .then((user) => (user ? res.json(user) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function update(req, res, next) {
    userService
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}

function _delete(req, res, next) {
    userService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch((err) => next(err));
}
