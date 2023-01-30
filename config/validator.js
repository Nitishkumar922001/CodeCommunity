
const { validationResult, ValidationChain } = require('express-validator');
module.exports=validate = (validations) => {
    return async (req, resp, next) => {


        await Promise.all(validations.map((validation) => validation.run(req)))

        const validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            next();
        }
        else
        resp.status(400).json({ msg: validationErrors.array() });
    };


};