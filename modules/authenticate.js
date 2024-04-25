const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "hkjhakd_dajkbb123ASVDHAkjjn12k3!jbdkabd_231";

// todo: replace this with a database in production
const users = [];

const signUp = (username, password) => {
    try {
        app.post('/signup', async (req, res) => {
            const { username, password } = req.body;

            // username already taken
            if (users.find(user => user.username === username)) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = { username, password: hashedPassword };

            // todo: replace this with a database in production
            users.push(newUser);

            // Respond with a success message
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (error) {
        console.log(`Login handeled error: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const signIn = (username, password) => {
    try {
        app.post('/login', async (req, res) => {
            const { username, password } = req.body;

            const user = users.find(user => user.username === username);

            // If user not found or password is incorrect, respond with an error
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign({ username: user.username }, secretKey);
            res.json({ token });
        });
    } catch (error) {
        console.log(`Login handeled error: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// exports 
module.exports.signIn = signIn;
module.exports.signUp = signUp;
