import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginRequired  = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({message: 'Unauthorized user!'});
    }
};

export const register = async (req, res) => {
    const {UserID,Name, Password, Email ,ContactNumber} = req.body;
    console.log(Password,Email, Name,)
    const hashedPassword = bcrypt.hashSync(Password, 10);
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('Name', sql.VarChar, Name)
            .input('Email', sql.VarChar, Email)
            .query('SELECT * FROM users WHERE Name = @Name OR Email = @Email');
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({error: 'User already exists'});
        } else {
            await pool.request()
                .input('UserID', sql.VarChar, UserID)
                .input('Name', sql.VarChar, Name)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('Email', sql.VarChar, Email)
                .input('ContactNumber', sql.VarChar, ContactNumber)
                .query('INSERT INTO users (UserID, Name, Password, Email, ContactNumber) VALUES (@UserID, @Name, @hashedpassword, @Email, @ContactNumber)');
            res.status(200).send({message: 'User created successfully'});
        }
        } catch (error) {
            res.status(500).json(error.message)
    } finally {
        sql.close();
    }
};

export const login = async(req, res) => {
    const { Name , password} = req.body;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
        .input('Name', sql.VarChar, Name)
        .query('SELECT * FROM Users WHERE Name = @Name');
    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Invalid Name or Password' });
    } else {
        if (!bcrypt.compareSync(password, user.hashedPassword)) {
            res.status(401).json(error.message);
        } else {
            const token = `JWT ${jwt.sign({ Name: user.Name, Email: user.Email}, config.jwt_secret)}`;
            res.status(200).json({Email: user.Email, Name: user.Name, id: user.id, token: token});
        }
    }
};