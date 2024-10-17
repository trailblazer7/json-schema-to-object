function getRandomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomString(pattern) {
  const max_length = 20;
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const charactersLength = characters.length;
  for (let i = 0; i < max_length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  if (pattern) {
    return 'https://example.corezoid.com/api/1/json/public/123/asdas';
  }
  return result;
}

function getResultFromSchema(schema, definitions = {}) {
  let type = schema?.type;

  // If there is anyOf array let's take one item and getResultFromSchema by its type
  if (!type && schema?.anyOf && schema.anyOf.length) {
    const anyOf_length = schema.anyOf.length;
    const random_schema = schema.anyOf[getRandomInt(0, anyOf_length)];
    return getResultFromSchema(random_schema, definitions);
  }

  // If $ref exists
  if (schema?.$ref) {
    const ref = schema.$ref.replace(/^#\//).split('/');
    let definition = definitions;
    ref.forEach((key) => {
      definitions = definitions[key];
    });
    return getResultFromSchema(definition, definitions);
  }

  // Return value by type
  switch (type) {
    case 'integer':
      return getRandomInt(schema.minimum, schema.maximum);
    case 'string':
      return getRandomString(schema.pattern);
    case 'boolean':
      return Math.random() > 0.5;
    case 'object':
      const obj = {};
      if (!schema.properties) return obj;

      if (schema.required) {
        schema.required.forEach((field) => {
          obj[field] = getResultFromSchema(
            schema.properties[field],
            definitions
          );
        });
      }
      for (const [key, _schema] of Object.entries(schema.properties)) {
        if (!obj[key]) {
          obj[key] = getResultFromSchema(_schema, definitions);
        }
      }
      return obj;
    case 'array':
      const length = schema.minItems || 1;
      const items = [];
      for (let i = 0; i < length; i++) {
        items.push(getResultFromSchema(schema.items, definitions));
      }
      return items;
    case undefined:
      if (schema?.enum) {
        return schema.enum[getRandomInt(0, schema.enum?.length)];
      }
    default:
      return null;
  }
}

function JSON_schema_to_object(schema) {
  const result_object = getResultFromSchema(schema, schema.definitions);

  console.log('Result: ', result_object);
  return result_object;
}

export default JSON_schema_to_object;
