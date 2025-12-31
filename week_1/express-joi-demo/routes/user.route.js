const express = require('express');
const userRegistrationSchema = require('../validation/user.schema');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        // Validate request body against schema
        const validatedData = await userRegistrationSchema.validateAsync(req.body, {
            abortEarly: false
        });

        // If validation passes, process the registration
        // TODO: Add user registration logic (save to database, etc.)
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                name: validatedData.name,
                email: validatedData.email
            }
        });
    } catch (error) {
        // Handle Joi validation errors
        if (error.isJoi) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }))
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;