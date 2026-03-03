/**
 * Sanitiza uma string removendo caracteres especiais (exceto "-"), convertendo para minúsculas e substituindo espaços por "-".
 * @param input - A string que será sanitizada.
 * @returns A string sanitizada.
 */

export function getSanitize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais, exceto "-"
    .replace(/\s+/g, "-"); // Substitui espaços por "-"
}
