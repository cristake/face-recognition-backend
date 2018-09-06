const handleRegister = (db, bcrypt) => (req, resp) => {
    const { name, email, password } = req.body
    if(!email || !password || !name) 
        return resp.json('incorrect submission')

    const hash = bcrypt.hashSync(password)

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => resp.json(user))
            .catch(err => resp.status(400).json(err))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
}

module.exports = {
    handleRegister
}