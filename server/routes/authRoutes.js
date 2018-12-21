const passport = require('passport');
const Auth = require('./../controllers/auth');

module.exports = (app) => {
	app.get('/auth/google', 
		passport.authenticate('google',{
			scope:['profile','email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));
	app.post('/signup',Auth.signup);
	app.post('/signin',passport.authenticate('local'),(req,res)=>{
		res.send({logged:'in'});
	});
	app.get('/logout',(req,res)=>{
		req.logout();
	});
	app.get('/profile',(req,res)=>{
		res.send(req.user.id);
	});
}
