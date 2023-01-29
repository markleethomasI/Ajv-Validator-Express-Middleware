<a name="AjvValidateMiddleware"></a>

## AjvValidateMiddleware
Provides Ajv validation services to Express Routes

Usage:
```
const AjvValidateMiddleware = require("ajv-validate-middleware");

const validateMiddleware = new AjvValidateMiddleware();

const express = require('express');
const app = express();

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

app.use(express.json())

app.post('/', validateMiddleware.validate('body', 'user'))

app.use((error, req, res, next) => {
    res.status(400).send(error)
})

app.listen(3000, () => {
    console.log('Express is listening... Talk!')
})

```
**Kind**: global class  

* [AjvValidateMiddleware](#AjvValidateMiddleware)
    * [.validate](#AjvValidateMiddleware+validate) ⇒ <code>function</code>
    * [.createSchema(schema)](#AjvValidateMiddleware+createSchema)
    * [.addFormat(formatName, formatSchema)](#AjvValidateMiddleware+addFormat)

<a name="AjvValidateMiddleware+validate"></a>

### ajvValidateMiddleware.validate ⇒ <code>function</code>
Validate
Usage:

For query params:
router.post('/:userId', validate('params', 'mySchema'))

For json body:
router.post('/', validate('body', 'mySchema'))

Errors:
Validation errors are passed to next express handler

**Kind**: instance property of [<code>AjvValidateMiddleware</code>](#AjvValidateMiddleware)  
**Returns**: <code>function</code> - (req, res, next)  

| Param | Type |
| --- | --- |
| reqProperty | <code>String</code> | 
| schemaName | <code>String</code> | 

<a name="AjvValidateMiddleware+createSchema"></a>

### ajvValidateMiddleware.createSchema(schema)
Creates ajv function from schema and pushes to validators

**Kind**: instance method of [<code>AjvValidateMiddleware</code>](#AjvValidateMiddleware)  

| Param | Type |
| --- | --- |
| schema | <code>Object</code> | 

<a name="AjvValidateMiddleware+addFormat"></a>

### ajvValidateMiddleware.addFormat(formatName, formatSchema)
Adds a format to validator

**Kind**: instance method of [<code>AjvValidateMiddleware</code>](#AjvValidateMiddleware)  

| Param | Type |
| --- | --- |
| formatName | <code>String</code> | 
| formatSchema | <code>Object</code> | 