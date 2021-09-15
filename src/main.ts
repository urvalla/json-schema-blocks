import assert = require('assert');

/**
 * Schema block for 'array' type
 *
 * @param items - Items schema
 */
export function arr(items: object) {
  return {
    type: 'array',
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

/**
 * Schema block for 'object' type
 *
 * @param properties - properties
 * @param options
 */
export function obj(
  properties: Record<string, any>,
  options: { optional?: string[]; required?: string[]; additionalProperties?: boolean } = {},
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

  return compact({
    type: 'object',
    properties,
    required,
    additionalProperties: options.additionalProperties,
  });
}

interface IStrOptions {
  minLength?: number;
  maxLength?: number;
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
 * @param minLengthOrOpts - number (minLength) or object with options
 * @param maxLength - maxLength option
 */
export function str(minLengthOrOpts?: number | IStrOptions, maxLength?: number) {
  if (minLengthOrOpts === undefined) {
    return strOpts({});
  } else if (typeof minLengthOrOpts === 'number') {
    return strOpts({ minLength: minLengthOrOpts, maxLength });
  } else {
    return strOpts(minLengthOrOpts);
  }
}

/**
 * Schema block for "string" enum. Can be used to define restricted list of values.
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
 * Schema block for integer type
 *
 * @param minimum
 * @param maximum
 */
export function int(minimum?: number, maximum?: number) {
  return compact({
    type: 'integer',
    minimum,
    maximum,
  });
}

/**
 * Schema block for "number" type
 */
export function num() {
  return {
    type: 'number',
  };
}

/**
 * Schema block for positive integer (>=1), shortcut to int(1).
 * E.g. record ID.
 */
export function id() {
  return int(1);
}

/**
 * Schema block for "boolean" type
 */
export function bool() {
  return {
    type: 'boolean',
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
