# JSON-Schema Blocks

Building blocks for human-friendly JSON-Schema definition.

```js
// JSON example
const json = {
    prop1: "val1",
    prop2: 2
}

// schema defined with blocks
const blocks = obj({
    prop1: str(),
    prop2: num()
})

// generated JSON-Schema
const jsonSchema = {
    type: "object",
    properties: {
        prop1: {
            type: "string"
        },
        prop2: {
            type: "number"
        }
    }
}
```
