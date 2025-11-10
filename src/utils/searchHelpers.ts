/**
 * Escapa caracteres especiales de expresiones regulares en un string
 * para que puedan ser usados de forma literal en un patrón RegExp.
 * 
 * @param text - String a escapar
 * @returns String con caracteres especiales escapados
 * 
 * @example
 * escapeRegExp("test.") // → "test\\."
 * escapeRegExp("(hello)") // → "\\(hello\\)"
 * escapeRegExp("price $10") // → "price \\$10"
 */
export function escapeRegExp(text: string): string {
  // Caracteres especiales de RegExp que necesitan ser escapados:
  // . * + ? ^ $ { } ( ) | [ ] \
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


