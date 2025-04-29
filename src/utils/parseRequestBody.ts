const parseRequestBody = (requestBody: any) => {
  const parsedBody = Object.fromEntries(
    Object.entries(requestBody)
      .map(([key, value]: [string, any]) => {
        if (
          typeof JSON.parse(value) !== 'object' &&
          typeof JSON.parse(value) !== 'boolean' &&
          typeof Number(JSON.parse(value)) === 'number' &&
          !isNaN(Number(JSON.parse(value)))
        ) {
          return [key, Number(JSON.parse(value))];
        } else {
          return [key, JSON.parse(value)];
        }
      })
      .filter(([_, value]) => value !== null && value !== undefined),
  );

  return parsedBody;
};

export default parseRequestBody;
