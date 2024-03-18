
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const usersData = fs.readFileSync('login.json');
const users = JSON.parse(usersData);

function generateToken(user) {
    return jwt.sign({ id: user.username }, process.env.JWT_SECRET, {
        expiresIn: 86400 
    });
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log(user.password.length,password.length,user.password===password);
        // const passwordMatch = await bcrypt.compare(password, user.password); //can be used when hasing and the comparing thr password
        // if (!passwordMatch) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login
};
