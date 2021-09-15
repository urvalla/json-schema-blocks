import assert = require('assert');

export const Greeter = (name: string) => `Hello ${name}`;

export function arr(items: object) {
    return {
        type: 'array',
        items,
    }
}

export function nullable(value: any) {
    if (typeof value.type === 'string') {
        return {...value, type: [value.type, 'null']}
    } else {
        return {...value, type: [...value.type, 'null']}
    }
}

export function obj(
    properties: object,
    options?: { optional?: string[], required?: string[], additionalProperties?: boolean }
) {
    let required: string[] = []

    if (options?.required) {
        assert(!options?.optional, "required and optional options can't be used simultaneously")
        required = options.required
    } else {
        required = Object.keys(properties)

        const optional = options?.optional;
        if (optional) {
            required = required.filter(v => !optional.includes(v))
        }
    }

    return compact({
        type: 'object',
        properties,
        required,
        additionalProperties: options?.additionalProperties,
    })
}

interface IStrOptions {
    minLength?: number,
    maxLength?: number
}

function strOpts(opts: IStrOptions) {
    return compact({
        type: 'string',
        ...opts,
    })
}

/**
 * Schema for 'string' type
 *
 * @param minLengthOrOpts - number (minLength) or object with options
 * @param maxLength - maxLength option
 */
export function str(minLengthOrOpts?: number | IStrOptions, maxLength?: number) {
    if (minLengthOrOpts === undefined) {
        return strOpts({})
    } else if (typeof minLengthOrOpts === 'number') {
        return strOpts({minLength: minLengthOrOpts, maxLength})
    } else {
        return strOpts(minLengthOrOpts)
    }
}

export function enumStr(...values: string[]) {
    return compact({
        type: 'string',
        enum: values,
    })
}

export function int(minimum?: number, maximum?: number) {
    return compact({
        type: 'integer',
        minimum,
        maximum,
    })
}

export function num() {
    return {
        type: 'number',
    }
}

export function id() {
    return int(1)
}

export function bool() {
    return {
        type: 'boolean'
    }
}

function compact(data: Record<string, any>): object {
    const compacted: Record<string, any> = {};
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
            compacted[key] = data[key];
        }
    })
    return compacted;
}
