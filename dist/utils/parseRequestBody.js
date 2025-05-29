var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
        .filter(([_, value]) => value !== null && value !== undefined));
    const { position } = parsedBody, data = __rest(parsedBody, ["position"]);
    return data;
};
export default parseRequestBody;
