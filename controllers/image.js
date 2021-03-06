const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '4ca48d008be14f83bcb8b81968d9ee30'
});

const handleApiCall = (req, res) => {
 app.models
     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data => {
          res.json(data);
     })
     .catch(err => res.status(400).json('unable to work with api'))
}
const handleImage =  (req, res, db) => {
	const {id} = req.body;
	db('users')
     .where('id','=', id)
     .increment('entries',1)
     .returning('entries')
     .then(entires => {
     	res.json(entires[0]);
     })
     .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
     handleApiCall
}