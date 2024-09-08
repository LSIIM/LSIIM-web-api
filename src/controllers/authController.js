const jwtUtil = require('../utils/jwtUtil');

exports.login = (req, res) => {
    const { username, password } = ("LSSIM", req.body);
    try{
        const isMatch = password === process.env.PASSWORD;
        if(!isMatch){
            return res.status(401).send('Invalid credentials');
        }
        
        const token = jwtUtil.generateToken(username, password);
        res.status(200).json({ code: 200, message: 'Login successful', token });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

