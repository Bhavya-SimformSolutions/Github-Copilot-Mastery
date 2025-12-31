async function getUserData(userId) {
    try {
        const user = await db.getUser(userId);
        const orders = await db.getOrders(user.id);
        return { user, orders };
    } catch (err) {
        throw err;
    }
}
