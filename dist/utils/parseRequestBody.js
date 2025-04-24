const parseRequestBody = (requestBody) => {
    const parsedBody = Object.fromEntries(Object.entries(requestBody)
        .map(([key, value]) => {
        if (typeof JSON.parse(value) !== 'object' &&
            typeof JSON.parse(value) !== 'boolean' &&
            typeof Number(JSON.parse(value)) === 'number' &&
            !isNaN(Number(JSON.parse(value)))) {
            return [key, Number(JSON.parse(value))];
        }
        else {
            return [key, JSON.parse(value)];
        }
    })
        .filter(([_, value]) => !!value));
    return parsedBody;
};
export default parseRequestBody;
