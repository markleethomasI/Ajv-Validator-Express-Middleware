const Ajv = require("ajv");
const AjvErrors = require("ajv-errors");
const AjvFormats = require("ajv-formats");

module.exports = class AjvValidateMiddleware {
    constructor() {
        this.#ajv = new Ajv({ allErrors: true });
        AjvErrors(this.#ajv);
        AjvFormats(this.#ajv);

        this.#validators = new Object();
    }

    #ajv;
    #validators;

    #getValidator(schemaName) {
        if (typeof this.#validators[schemaName] !== "function") throw new Error("Ajv Validator Middleware Error: " + schemaName + " not found");
        return this.#validators[schemaName];
    }

    /**
     * Creates ajv function from schema and pushes to validators
     * @param {Object} schema
     *
     */

    createSchema(schema) {
        const key = Object.keys(schema)[0];
        const validateFunction = this.#ajv.compile(schema[key]);
        this.#validators[key] = validateFunction;
    }

    /**
     * Adds a format to validator
     * @param {String} formatName
     * @param {Object} formatSchema
     */

    addFormat(formatName, formatSchema) {
        this.#ajv.addFormat(formatName, formatSchema);
    }

    /**
     * Validate
     * Usage:
     *
     * For query params:
     * router.post('/:userId', validate('params', 'mySchema'))
     *
     * For json body:
     * router.post('/', validate('body', 'mySchema'))
     *
     * Errors:
     * Validation errors are passes to next express handler
     *
     * @param {String} reqProperty
     * @param {String} schemaName
     * @returns {Function} (req, res, next)
     */
    validate = function (reqProperty, schemaName) {
        // Throws error on non existent schema
        const validator = this.#getValidator(schemaName);

        return (req, res, next) => {
            const validatorFunction = this.#validators[schemaName];

            const validatorResponse = validator(req[reqProperty]);

            if (!validatorResponse) {
                // Construct response object
                const errorMessages = [];

                validatorFunction.errors.forEach((error) => {
                    errorMessages.push({
                        message: error.message,
                    });
                });

                return next(errorMessages);
            }

            next();
        };
    };
};
