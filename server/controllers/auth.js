const mongoose = require('mongoose');
const User = mongoose.model('users');

exports.signup = (req,res,next) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email},(err,existingUser)=>{
		if(err) { return next(err); }
		if(existingUser) {
			res.status(422).send({error:"mail in use"});
		}

		const user = new User({email,password});
		user.save((err)=>{
	    	if (err) { return next(err); }
	    });
	    res.send({signed:'in'});
	});
}