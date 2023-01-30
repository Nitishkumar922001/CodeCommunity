const db = require('../models/index');
const hashing = require('../config/passwordhashing');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const generatePassword = require('../config/generatePassword');
const user = require('../models/user');
const transporter = require('../config/nodemailer');
const { Op } = require('sequelize');
env.config();
module.exports.createUser = async (req, resp) => {
    const { password, userName } = req.body;
    const t = await db.sequelize.transaction();
    try {
        const userExists = await db.user.findOne({ where: { userName: userName } });
        if (userExists) {
            resp.send({ msg: 'user with  name is already exists' });

        }
        else {

            const hashedPassword = hashing(password);

            const user = await db.user.create({ userName, hashedPassword }, { transaction: t });

            await t.commit();
            resp.status(200).json({ user });


        }
    }

    catch (e) {
        await t.rollback();
        resp.status(400).json({ error: e });
    }
}



module.exports.signIn = async (req, resp) => {
    // get data of give userName
    const { userName, password } = req.body;
    // const t=await db.sequelize.transaction();
    try {

        // check given user is present or not 
        const user = await db.user.findOne({ where: { userName } });
        if (user) { // check give password;
            const hashedPassword = hashing(password);
            if (hashedPassword === user.hashedPassword) {
                const token = jwt.sign({ userId: user.userId }, process.env.token, { expiresIn: '1d' })
                resp.cookie('token', token, { expire: new Date() + 9999 });
                return resp.status(200).json({ msg: 'login done succssefully', token })
            }
            else {
                resp.status(200).json({ msg: 'UserName and password are not matching' })

            }

        }
        else {

            resp.status(200).json({ msg: 'no user exists with this userName' })
        }

    }
    catch (Err) {

        resp.status(400).json({ error: Err });
    }


}



module.exports.signOut = (req, resp, next) => {
    resp.clearCookie('token');
    return resp.status(200).json('signOut successfully');


}



module.exports.createProfile = async (req, resp) => {
    const t = await db.sequelize.transaction();
    try {// create profile 
        let { userId } = req.params;
        userId = Number(userId);
        const { firstName, lastName, DOB, Image } = req.body;
        const profileImage = req.file.path;
        const userExists = await db.user.findByPk(userId);
        if (userExists !== null) {

            const data = await db.userProfile.create({ userId, firstName, lastName, DOB, profileImage },
                { transaction: t })
            t.commit();
            resp.status(200).json({ userId });
        }
        else {
            return resp.json({ msg: 'please first create userAccount' });
        }
    }
    catch (err) {
        await t.rollback();//
        resp.status(400).json({ error: err });
    }
}

module.exports.deleteAccount = async (req, resp) => {
    const t = await db.sequelize.transaction();

    try {
        let { userId } = req.params;
        userId = Number(userId);
        const userExists = await db.user.findByPk(userId);
        if (userExists) {
            const result2 = await db.user.destroy({ where: { userId }, transaction: t });
            await t.commit();
            resp.json({ msg: 'account deleted successfully !' });
        }
        else {
            return resp.json({ msg: 'no user account with this id' });
        }

    }
    catch (Err) {
        await t.rollback();
        resp.status(400).json({ error: Err });
    }


}
module.exports.changePassword = async (req, resp) => {
    const { userName, password, conformPassword } = req.body;
    const t = await db.sequelize.transaction();
    if (password === conformPassword) {
        try {
            const userExists = await db.user.findOne({ where: { userName } });
            if (userExists !== null) {
                const hashedPassword = hashing(password);
                const data = await db.user.update({ hashedPassword }, { where: { userName }, transaction: t });
                resp.clearCookie('token');
                await t.commit();

                resp.status(200).json({ msg: 'password update successfully' })
            }
            else {
                resp.status(200).json({ msg: 'please enter correct user  name' })
            }
        }
        catch (Err) {
            await t.rollback();
            resp.status(400).json({ error: Err })
        }
    }
    else {
        resp.status(200).json({ msg: 'password and conformPassword are not matching' })
    }
}
module.exports.forgotPassword = async (req, resp) => {
    // validate the user
    const { userName } = req.body;
    const t = await db.sequelize.transaction();
    try {
        const userExists = await db.user.findOne({ where: { userName } });
        if (userExists) {
            // console.log(JSON.stringify(userExists));/
            const password = generatePassword();
            const hashedPassword = hashing(password);

            const data = await db.user.update({ hashedPassword }, { where: { userName }, transaction: t, attributes: ['hashedPassword'] })

            const emailConfig = {
                from: 'nitish.conversant@gmail.com',
                to: userName,
                subject: 'Password assistance',
                html: `<p><b>Hello Dear</b>
                        <br>
                To authenticate, please use this tempory password <b>${password}</b> 
        please change your password once you login.
        
        Thankyou for contacting us 
        </p>`
            }
            transporter.sendMail(emailConfig, function (error, data) {
                if (error) {
                    console.log(error);
                    // resp.status(400).json({error:error});
                }

            })


            await t.commit();
            resp.status(200).json({ msg: 'password updated successfully ', hashedPassword });

        }
        else {

            resp.status(200).json({ msg: 'there is no user with this userName' });
        }


    }
    catch (Err) {
        await t.rollback();
        resp.send({ error: Err });

    }


}