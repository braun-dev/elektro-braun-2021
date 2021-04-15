export function stringToNumber(stringValue: string): number {
  const validNumberString = stringValue.replace(',', '.');

  if (isNaN(+validNumberString)) {
    console.error('Could not create a valid number out of the following string: ', stringValue);
    return null;
  }

  return +validNumberString;
}
