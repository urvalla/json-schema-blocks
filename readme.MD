# JSON-Schema Blocks

Building blocks for human-friendly JSON-Schema definition.

```js
// JSON example
const json = {
    prop1: "value",
    prop2: 2
}

// schema defined with blocks
const blocks = obj({
    prop1: str(1),
    prop2: num()
})

// generated JSON-Schema
const jsonSchema = {
    type: "object",
    properties: {
        prop1: {
            type: "string",
            minLength: 1
        },
        prop2: {
            type: "number"
        }
    }
}
```
