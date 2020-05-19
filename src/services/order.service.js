const db = require("../_access/db");
const Order = db.Order;

module.exports = {
    fetchUserOrder,
    fetchRestaurantOrder,
    create,
    update
};

async function fetchUserOrder(userParam) {
    return await Order.find({ userId: userParam }).select("-hash");
}
async function fetchRestaurantOrder(userParam) {
    return await Order.find({ restaurantId: userParam }).select("-hash");
}

async function create(userParam) {
    const order = new Order(userParam);

    await order.save();

    return order;
}

async function update(id, userParam) {
    const order = await Order.findById(id);

    if (!order) throw "Order not found";

    Object.assign(order, userParam);

    await order.save();
}
