import assert = require('assert');

interface ICommonOptions {
  title?: string,
  description?: string,
  default?: any,
  examples?: any[],
  deprecated?: boolean,
  readOnly?: boolean,
  writeOnly?: boolean
}

/**
 * Schema block for 'array' type
 *
 * @param items - Items schema
 * @param options
 */
export function arr(items: object, options: ICommonOptions = {}) {
  return {
    type: 'array',
    ...options,
    items,
  };
}

/**
 * Adds 'null' to any passed block
 *
 * @param value - Schema to extend with 'null'
 */
export function nullable(value: any) {
  if (typeof value.type === 'string') {
    return { ...value, type: [value.type, 'null'] };
  } else {
    return { ...value, type: [...value.type, 'null'] };
  }
}

interface IObjOptions extends ICommonOptions {
  optional?: string[],
  required?: string[],
  additionalProperties?: boolean
}

/**
 * Schema block for 'object' type
 *
 * @param properties - properties
 * @param options
 */
export function obj(
  properties: Record<string, any>,
  options: IObjOptions = {},
) {
  let required: string[] = [];

  if ('required' in options) {
    assert(!options.optional, "required and optional options can't be used simultaneously");
    required = options.required!;
  } else {
    required = Object.keys(properties);

    const optional = options.optional;
    if (optional) {
      required = required.filter((v) => !optional.includes(v));
    }
  }

  let opts = options;
  // copy & modify (so original value wouldn't be affected) if optional is presented
  if ('optional' in opts) {
    opts = Object.assign({}, options);
    delete opts.optional;
  }

  return compact({
    type: 'object',
    properties,
    required,
    ...opts,
  });
}

interface IStrOptions extends ICommonOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
}

function strOpts(opts: IStrOptions) {
  return compact({
    type: 'string',
    ...opts,
  });
}

/**
 * Schema block for 'string' type
 *
 * https://json-schema.org/understanding-json-schema/reference/string.html
 *
 * @param minLengthOrOpts - number (minLength) or object with options
 * @param maxLength - maxLength option
 */
export function str(minLengthOrOpts?: number | IStrOptions | null, maxLength?: number) {
  if (minLengthOrOpts === undefined || minLengthOrOpts === null) {
    return strOpts({ maxLength });
  } else if (typeof minLengthOrOpts === 'number') {
    return strOpts({ minLength: minLengthOrOpts, maxLength });
  } else {
    return strOpts(minLengthOrOpts);
  }
}

/**
 * Schema block for "string" enum. Can be used to define restricted list of values.
 *
 * https://json-schema.org/understanding-json-schema/reference/generic.html
 *
 * @param values - array of allowed values
 */
export function enumStr(...values: string[]) {
  return compact({
    type: 'string',
    enum: values,
  });
}

/**
 * Schema block for enum without defined type. Can be used to define restricted list of values of different types.
 *
 * https://json-schema.org/understanding-json-schema/reference/generic.html
 *
 * @param values - array of allowed values
 */
export function enumeration(...values: (string | number | boolean | null)[]) {
  return compact({
    enum: values,
  });
}

/**
 * Schema block for const. Can be used to define restricted list of values of different types.
 *
 * https://json-schema.org/understanding-json-schema/reference/generic.html
 *
 * @param value - constant value
 * @param options
 */
export function constant(value: string | number | boolean | null, options: ICommonOptions = {}) {
  return compact({
    const: value,
    ...options,
  });
}

interface INumOptions extends ICommonOptions {
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

function numOpts(type: 'integer' | 'number', opts: INumOptions) {
  return compact({
    type,
    ...opts,
  });
}

/**
 * Schema block for integer type
 *
 * https://json-schema.org/understanding-json-schema/reference/numeric.html
 *
 * @param minimumOrOpts
 * @param maximum
 */
export function int(minimumOrOpts?: number | INumOptions | null, maximum?: number) {
  if (minimumOrOpts === undefined || minimumOrOpts === null) {
    return numOpts('integer', { maximum });
  } else if (typeof minimumOrOpts === 'number') {
    return numOpts('integer', { minimum: minimumOrOpts, maximum });
  } else {
    return numOpts('integer', minimumOrOpts);
  }
}

/**
 * Schema block for "number" type
 *
 * https://json-schema.org/understanding-json-schema/reference/numeric.html
 *
 */
export function num(minimumOrOpts?: number | INumOptions | null, maximum?: number) {
  if (minimumOrOpts === undefined || minimumOrOpts === null) {
    return numOpts('number', { maximum });
  } else if (typeof minimumOrOpts === 'number') {
    return numOpts('number', { minimum: minimumOrOpts, maximum });
  } else {
    return numOpts('number', minimumOrOpts);
  }
}

/**
 * Schema block for positive integer (>=1), shortcut to int(1).
 * E.g. record ID.
 */
export function id(options: ICommonOptions = {}) {
  return int({minimum: 1, ...options});
}

/**
 * Schema block for "boolean" type
 */
export function bool(options: ICommonOptions = {}) {
  return {
    type: 'boolean',
    ...options,
  };
}

function compact(data: Record<string, any>): object {
  const compacted: Record<string, any> = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      compacted[key] = data[key];
    }
  });
  return compacted;
}
