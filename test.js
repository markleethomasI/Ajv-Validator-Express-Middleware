const AjvValidateMiddleware = require("./index");

const validateMiddleware = new AjvValidateMiddleware();

validateMiddleware.createSchema({
    user: {
        type: "object",
        properties: {
            firstName: {
                type: "string",
            },
            lastName: {
                type: "string",
            },
            email: {
                type: "string",
                format: "email",
            },
        },
        required: ["firstName", "lastName", "email"],
        errorMessage: {
            type: "Should be an Object",
            required: {
                email: "Email is required",
                firstName: "firstName is required",
                lastName: "lastName is required",
            },
            properties: {
                email: "A valid email is required",
            },
        },
    },
});

const middleware = validateMiddleware.validate("params", "user2");

validateMiddleware.validate

middleware({ params: {} }, "", (errors) => {
    console.log(errors);
});
