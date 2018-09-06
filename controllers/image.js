const Clarifai = require('clarifai')

const app = new Clarifai.App({
	apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = () => (req, resp) => {
    const { input } = req.body
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => resp.json(data))
        .catch(err => resp.status(400).json('unable to talk to the api'))
}

const handleImage = (db) => (req, resp) => {
    const { id } = req.body
    db.select('*').from('users')
        .where('id', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => resp.json(entries))
        .catch(err => resp.status(400).json('cannot get entries'))
}

module.exports = {
    handleApiCall,
    handleImage
}