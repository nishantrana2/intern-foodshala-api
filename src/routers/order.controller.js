import express from "express";
const router = express.Router();

const setup = require("../services/order.service");

router.post("/addOrder", order);
router.put("/:id", update);
router.get("/:id/:userType", fetchByUser);

function fetchByUser(req, res, next) {
    if (req.params.userType === "Customer") {
        setup
            .fetchUserOrder(req.params.id)
            .then((order) => res.json(order))
            .catch((err) => next(err));
    } else if (req.params.userType === "Restaurant") {

        setup
            .fetchRestaurantOrder(req.params.id)
            .then((order) => res.json(order))
            .catch((err) => next(err));
    } else {
        res.send({ message: "Provide the usertype" });
    }
}


function order(req, res, next) {
    setup
        .create(req.body)
        .then((order) => res.json(order))
        .catch((err) => next(err));
}

function update(req, res, next) {
    setup
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}



module.exports = router;