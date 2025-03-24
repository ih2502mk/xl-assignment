import type { ComplexAttributeConverter } from 'lit';

export const unicodeStringConverter:ComplexAttributeConverter<string, string> = {
  fromAttribute(value: string | null) {
    if (value === null) {
      return '';
    }
    if (value.startsWith('U+')) {
      const points = value.split(',');
      
      const codes = points
        .map(p => p.replace('U+', ''))
        .map(p => parseInt(p, 16))

      if (codes.some(c => isNaN(c))) {
        console.warn('Value contains invalid unicode code point', value);
        return '';
      }

      return String.fromCodePoint(...codes);
    }

    console.warn('Invalid unicode code point', value);

    return '';
  }
}
