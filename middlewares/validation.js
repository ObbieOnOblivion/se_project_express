const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}

const validateClothingItem = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        imageUrl: Joi.string().required().custom(validateURL).messages({
            'string.empty': 'The "imageUrl" field must be filled in',
            'string.uri': 'the "imageUrl" field must be a valid url',
        }),
    }),
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

const validateId = celebrate({
    params: Joi.object().keys({
        itemId: Joi.string().hex().length(24).required(),
        userId: Joi.string().hex().length(24).required(),
    }),
});

module.exports = { validateClothingItem, validateUserInfo, validateUserLogin, validateId };
