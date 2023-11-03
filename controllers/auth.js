import bycrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import User from "../models/User.js";


/*register user*/
export const register = async(req, res) => {
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            followers,
            location,
            occupation
        }= req.body;
        const salt = await bycrypt.genSalt();
        const passwordHash = await bycrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            followers,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()* 1000),
            impressions: Math.floor(Math.random() * 1000),
        })
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (err){
        res.status(500).json({error: err.message });
    }
};
/*login in*/
export const login = async(req, res) => {
    try{
        const {email, password } = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg: "User does not Exist"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials."});
        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({error: err.message}); 
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}