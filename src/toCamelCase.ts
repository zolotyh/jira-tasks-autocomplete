export const toCamelCase = (input: string): string =>
  input
    .toLowerCase()
    .replace(/([-_][a-z])/gi, (firstMatch) =>
      firstMatch.toUpperCase().replace('-', '').replace('_', ''),
    );
