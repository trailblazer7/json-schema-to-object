import JSON_schema_to_object from './json-schema-to-object';
const JSON_schema = require('./json-schema.json');

describe('JSON schema to object', () => {
  const result = JSON_schema_to_object(JSON_schema);

  it('id is present in object(type string | integer)', () => {
    const typeChecker =
      typeof result.id === 'string' || typeof result.id === 'number';
    expect(typeChecker).toBe(true);
  });

  it("title present in object(type string)'", () => {
    expect(
      result.title && result.title.length && typeof result.title === 'string'
    ).toBe(true);
  });

  it('description present in object(type string)', () => {
    expect(
      result.description &&
        result.description.length &&
        typeof result.description === 'string'
    ).toBe(true);
  });

  it('startDate present in object(type number)', () => {
    expect(result.startDate && typeof result.startDate === 'number').toBe(true);
  });

  it('endDate present in object(type number)', () => {
    expect(result.endDate && typeof result.endDate === 'number').toBe(true);
  });

  it('attendees present in object(type array)', () => {
    expect(result.attendees && result.attendees instanceof Array).toBe(true);
  });
});
