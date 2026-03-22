/**
 * Shell token databases for syntax highlighting.
 */

export const KEYWORDS = new Set([
  "if", "then", "else", "elif", "fi",
  "for", "in", "do", "done",
  "while", "until",
  "case", "esac",
  "function", "select", "time",
]);

export const OPERATORS = [
  "&&", "||", "|&", "|", ";;", ";;&", ";&", ";",
  "&>>", "&>", ">>", ">|", ">", "<<-", "<<<", "<<", "<>", "<&", "<",
  ">&", "&", "((", "))", "(", ")", "{", "}", "[[", "]]", "!",
];

export const PREFIX_COMMANDS = new Set([
  "sudo", "su", "doas", "env", "nice", "nohup", "time",
  "strace", "ltrace", "xargs", "exec", "command", "builtin",
]);

export function isKeyword(word: string): boolean {
  return KEYWORDS.has(word);
}

export function matchOperator(str: string): string | null {
  for (const op of OPERATORS) {
    if (str.startsWith(op)) return op;
  }
  return null;
}

export function isOption(word: string): boolean {
  return /^--?[a-zA-Z]/.test(word);
}

export function isPath(word: string): boolean {
  return word.includes("/") && !word.startsWith("$");
}

export function isNumber(word: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(word);
}

export function isPrefixCommand(word: string): boolean {
  return PREFIX_COMMANDS.has(word);
}
