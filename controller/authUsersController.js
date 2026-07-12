import User from '../model/usersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {
    try {
        const {
            role,
            province,
            email,
            password,
        } = req.body;

        if (!role || !province || !email || !password) {
            return res.status(400).json({
                message: "All data are required!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            role,
            province,
            email,
            password: hashedPassword
        };
        
        const result = await User.createUsers(data)

        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error) {

        if (error.code === "23505") {
            if (error.constraint === "users_email_key") {
                return res.status(400).json({
                    message: "Email already exists."
                });
            }
        }
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password Required!"
            });
        }

        const user = await User.readUsers(email);
        if (!user) return res.status(404).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ message: 'Incorrect password'});

        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, {
           expiresIn: '24h', 
        });

        return res.status(200).json({
            message: 'Login successfully!',
            token,
            user: {
                id: user.id,
                role: user.role,
                province: user.province
            },
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const readAllUsers = async (req, res) => {
    try {
        const users = await User.readAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        await User.deleteUsers(id);
            res.json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).json({error});
    }
};

export default { signUp, login, readAllUsers, deleteUser };