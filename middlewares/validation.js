const { celebrate, Joi, Segments } = require('celebrate'); 
const validator = require('validator');
// why is my project so slow on the frontend
// why does my frontend suck 
// why doesent the mobile version work


const validateURL = (value, helpers) => { // what is helpers doing
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}

const validateClothingItem = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        weather: Joi.string().valid('hot', 'warm', 'cold').required(),
        imageUrl: Joi.string().required().custom(validateURL).messages({
            'string.empty': 'The "imageUrl" field must be filled in',
            'string.uri': 'the "imageUrl" field must be a valid url',
        }).unknown(true),
    })
});

const validateUserInfo = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        avatar: Joi.string().uri().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});

const validateUserLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
});

const validateUserInfoToUpdate = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        avatar: Joi.string().uri().required()
    })
})


const validateItemIdInHeaders = celebrate({ // i dont like this approach look into adding _id to the body
    [Segments.HEADERS]: Joi.object({
      _id: Joi.string().hex().length(24).required(),
    }).unknown(true), // i dont like this rhetoric being spewed 
  });

module.exports = { validateClothingItem, validateUserInfo, validateUserLogin, validateItemIdInHeaders,
    validateUserInfoToUpdate
 };
