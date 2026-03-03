/**
 * Checks if a CPF number is valid.
 * @param cpf - The CPF number as a string, which may contain non-numeric characters (like '.', '-').
 * @returns A boolean indicating whether the CPF is valid.
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;

  // Remove all non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, "");

  // CPF must be exactly 11 digits
  if (cleanCPF.length !== 11) return false;

  // Invalidates known invalid CPFs (e.g., all digits the same)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i), 10) * (10 - i);
  }
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10 || firstCheck === 11) {
    firstCheck = 0;
  }
  if (firstCheck !== parseInt(cleanCPF.charAt(9), 10)) {
    return false;
  }

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i), 10) * (11 - i);
  }
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10 || secondCheck === 11) {
    secondCheck = 0;
  }
  if (secondCheck !== parseInt(cleanCPF.charAt(10), 10)) {
    return false;
  }

  return true;
}

/**
 * Checks if a CNPJ number is valid.
 * @param cnpj - The CNPJ number as a string, which may contain non-numeric characters (like '.', '/', '-').
 * @returns A boolean indicating whether the CNPJ is valid.
 */
export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;

  // Remove all non-numeric characters
  const cleanCNPJ = cnpj.replace(/\D/g, "");

  // CNPJ must be exactly 14 digits
  if (cleanCNPJ.length !== 14) return false;

  // Invalidates known invalid CNPJs (e.g., all digits the same)
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  // Validate first check digit
  let length = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, length);
  const digits = cleanCNPJ.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) {
    return false;
  }

  // Validate second check digit
  length = length + 1;
  numbers = cleanCNPJ.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) {
    return false;
  }

  return true;
}
