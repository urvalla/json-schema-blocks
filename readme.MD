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
    },
    required: ['prop1', 'prop2']
}
```

# Functions

## String ##

```js
// String schema
str()

// Result
{
  type: 'string'
}
```

#### str() options ####
```js
// Minimum length: 1 char
str(1)

// Result
{
  type: 'string'
}
```

```js
// Minimum length: 1 char, maximum length: 10 chars
str(1, 10)

// Result
{
  type: 'string',
  minLength: 1,
  maxLength: 10
}
```

```js
// No minimum length, maximum length: 10 chars
str(null, 10)

// Result
{
  type: 'string',
  maxLength: 10
}
```

```js
// Oprions can be passed "as is" also
str({maxLength: 10})

// Result
{
  type: 'string',
  maxLength: 10
}
```

## Number ##

```js
// Number schema
num()

// Result
{
  type: 'number'
}
```

#### num() options ####
```js
// Minimum: 1
num(1)

// Result
{
  type: 'number',
  minimum: 1
}
```

```js
// Minimum: 1, maximum: 10
num(1, 10)

// Result
{
  type: 'number',
  minumum: 1,
  maximum: 10
}
```

```js
// No minimum limit, maximum: 10
str(null, 10)

// Result
{
  type: 'number',
  maximum: 10
}
```

```js
// Oprions can be passed "as is" also
str({maximum: 10})

// Result
{
  type: 'number',
  maximum: 10
}
```

#### int() helper ####
Works same as `num()`, but with `integar type` 
```js
// Integer schema
int()

// Result
{
  type: 'integer'
}
```

#### id() helper ####
Common limitation for id in RDBS: should be >= 1
```js
// shortcut to int(1)
id()

// Result
{
  type: 'integer',
  minimum: 1
}
```

## Boolean ##

```js
// Boolean schema
bool()

// Result
{
  type: 'boolean'
}
```

## Array ##

```js
// Array of strings
arr(str())

// Result:
{
  type: 'array',
  items: {
    type: 'string'
  }
}
```

## Object ##

```js
// Object
obj({
  prop1: str()
})

// Result:
{
  type: "object",
  properties: {
    prop1: {
      type: "string"
    }
  },
  required: ['prop1'] // keys are required by default
}

// Valid object example:
{
  prop1: "value 1"
}
```

Required keys can be passed explicitly:
```js
// Object with required key "prop1"
obj({
  prop1: str(),
  prop2: str()
}, {
  required: ['prop1']
})

// Result:
{
  type: "object",
  properties: {
    prop1: {
      type: "string"
    },
    prop2: {
      type: "string"
    },
  },
  required: ['prop1']
}

// Valid objects example:
{
  prop1: "value 1"
}

{
  prop1: "value 1", 
  prop2: "value 2"
}
```

Optional keys can be passed explicitly:
```js
// Object with optional key "prop1"
obj({
  prop1: str(),
  prop2: str()
}, {
  required: ['prop2']
})

// Result:
{
  type: "object",
  properties: {
    prop1: {
      type: "string"
    },
    prop2: {
      type: "string"
    },
  },
  required: ['prop1']
}

// Valid objects example:
{
  prop1: "value 1"
}

{
  prop1: "value 1", 
  prop2: "value 2"
}
```

## Nullable ##
`null` is a type in JSON-Schema. It can be added to `type` via `nullable` helper.
```js
// Object with optional key "prop1"
nullable(str())

// Result:
{
  type: ["string", "null"]
}
```

## String enum ##
Restricted set of string values can be defined with `enumStr(...)`
```js
// Enum schema
enumStr('value1', 'value2')

// Result:
{
  type: 'string',
  enum: ['value1', 'value2']
}
```
