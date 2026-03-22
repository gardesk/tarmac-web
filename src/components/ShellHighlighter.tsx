import React from "react";
import {
  isKeyword,
  isOption,
  isPath,
  isNumber,
  matchOperator,
  isPrefixCommand,
} from "@/lib/shell-tokens";

type TokenType =
  | "command"
  | "keyword"
  | "option"
  | "string"
  | "variable"
  | "comment"
  | "operator"
  | "number"
  | "path"
  | "text"
  | "prompt";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let expectCommand = true;

  while (i < line.length) {
    const remaining = line.slice(i);

    if (/^\s/.test(remaining)) {
      let end = 0;
      while (end < remaining.length && /\s/.test(remaining[end])) end++;
      tokens.push({ type: "text", value: remaining.slice(0, end) });
      i += end;
      continue;
    }

    if (remaining[0] === "#") {
      tokens.push({ type: "comment", value: remaining });
      break;
    }

    if (remaining[0] === "'") {
      let end = 1;
      while (end < remaining.length && remaining[end] !== "'") end++;
      if (end < remaining.length) end++;
      tokens.push({ type: "string", value: remaining.slice(0, end) });
      i += end;
      expectCommand = false;
      continue;
    }

    if (remaining[0] === '"') {
      let end = 1;
      while (end < remaining.length && remaining[end] !== '"') {
        if (remaining[end] === "\\" && end + 1 < remaining.length) end++;
        end++;
      }
      if (end < remaining.length) end++;
      tokens.push({ type: "string", value: remaining.slice(0, end) });
      i += end;
      expectCommand = false;
      continue;
    }

    if (remaining[0] === "$") {
      let end = 1;
      if (remaining[1] === "{") {
        let depth = 1;
        end = 2;
        while (end < remaining.length && depth > 0) {
          if (remaining[end] === "{") depth++;
          if (remaining[end] === "}") depth--;
          end++;
        }
      } else if (remaining[1] === "(") {
        let depth = 1;
        end = 2;
        while (end < remaining.length && depth > 0) {
          if (remaining[end] === "(") depth++;
          if (remaining[end] === ")") depth--;
          end++;
        }
      } else if (/[?#@*$!_0-9]/.test(remaining[1] || "")) {
        end = 2;
      } else {
        while (end < remaining.length && /[a-zA-Z0-9_]/.test(remaining[end])) end++;
      }
      tokens.push({ type: "variable", value: remaining.slice(0, end) });
      i += end;
      expectCommand = false;
      continue;
    }

    const op = matchOperator(remaining);
    if (op) {
      tokens.push({ type: "operator", value: op });
      i += op.length;
      if (["|", "&&", "||", ";", "&", "(", "{"].includes(op)) expectCommand = true;
      continue;
    }

    const wordMatch = remaining.match(/^[^\s'"$#|&;<>(){}[\]]+/);
    if (wordMatch) {
      const word = wordMatch[0];
      let type: TokenType = "text";

      if (expectCommand) {
        if (isKeyword(word)) {
          type = "keyword";
        } else if (isPrefixCommand(word)) {
          type = "text";
        } else {
          type = "command";
          expectCommand = false;
        }
        if (["if", "then", "else", "elif", "do", "while", "until", "for", "case", "in", "{", "("].includes(word)) {
          expectCommand = true;
        }
      } else {
        if (isOption(word)) type = "option";
        else if (isPath(word)) type = "path";
        else if (isNumber(word)) type = "number";
        else if (isKeyword(word)) {
          type = "keyword";
          expectCommand = true;
        }
      }

      tokens.push({ type, value: word });
      i += word.length;
      continue;
    }

    tokens.push({ type: "text", value: remaining[0] });
    i++;
  }

  return tokens;
}

function tokenize(code: string): Token[][] {
  return code.split("\n").map((line) => {
    const trimmed = line.trimStart();
    const leadingWs = line.slice(0, line.length - trimmed.length);
    const tokens: Token[] = [];
    if (leadingWs) tokens.push({ type: "text", value: leadingWs });
    if (trimmed.startsWith("$ ")) {
      tokens.push({ type: "prompt", value: "$ " });
      tokens.push(...tokenizeLine(trimmed.slice(2)));
    } else {
      tokens.push(...tokenizeLine(trimmed));
    }
    return tokens;
  });
}

const classMap: Record<TokenType, string> = {
  command: "sh-command",
  keyword: "sh-keyword",
  option: "sh-option",
  string: "sh-string",
  variable: "sh-variable",
  comment: "sh-comment",
  operator: "sh-operator",
  number: "sh-number",
  path: "sh-path",
  text: "sh-text",
  prompt: "sh-prompt",
};

interface ShellHighlighterProps {
  code: string;
  className?: string;
}

export default function ShellHighlighter({ code, className = "" }: ShellHighlighterProps) {
  const tokenizedLines = tokenize(code);

  return (
    <code className={className}>
      {tokenizedLines.map((tokens, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {tokens.map((token, tokenIndex) => (
            <span key={tokenIndex} className={classMap[token.type]}>
              {token.value}
            </span>
          ))}
          {lineIndex < tokenizedLines.length - 1 && "\n"}
        </React.Fragment>
      ))}
    </code>
  );
}
