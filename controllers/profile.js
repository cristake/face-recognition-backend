const show = (db) => (req, resp) => {
    const { id } = req.params
    db.select('*')
        .from('users')
        .where('id', id)
        .then(user => user.length ? resp.json(user) : resp.status(400).json({ error: 'user not found'}))
        .catch(err => console.log(err))
}

module.exports = {
    show
}