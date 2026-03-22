import React from "react";

type TokenType = "keyword" | "string" | "comment" | "number" | "function" | "operator" | "text";

interface Token {
  type: TokenType;
  value: string;
}

const LUA_KEYWORDS = new Set([
  "and", "break", "do", "else", "elseif", "end", "false", "for",
  "function", "goto", "if", "in", "local", "nil", "not", "or",
  "repeat", "return", "then", "true", "until", "while",
]);

function tokenizeLua(code: string): Token[][] {
  return code.split("\n").map((line) => {
    const tokens: Token[] = [];
    let i = 0;

    while (i < line.length) {
      const remaining = line.slice(i);

      // Line comment
      if (remaining.startsWith("--")) {
        tokens.push({ type: "comment", value: remaining });
        break;
      }

      // Whitespace
      if (/^\s/.test(remaining)) {
        let end = 0;
        while (end < remaining.length && /\s/.test(remaining[end])) end++;
        tokens.push({ type: "text", value: remaining.slice(0, end) });
        i += end;
        continue;
      }

      // String (double-quoted)
      if (remaining[0] === '"') {
        let end = 1;
        while (end < remaining.length && remaining[end] !== '"') {
          if (remaining[end] === "\\") end++;
          end++;
        }
        if (end < remaining.length) end++;
        tokens.push({ type: "string", value: remaining.slice(0, end) });
        i += end;
        continue;
      }

      // String (single-quoted)
      if (remaining[0] === "'") {
        let end = 1;
        while (end < remaining.length && remaining[end] !== "'") {
          if (remaining[end] === "\\") end++;
          end++;
        }
        if (end < remaining.length) end++;
        tokens.push({ type: "string", value: remaining.slice(0, end) });
        i += end;
        continue;
      }

      // Number
      if (/^-?\d/.test(remaining) || (remaining[0] === "." && /\d/.test(remaining[1] || ""))) {
        const m = remaining.match(/^-?(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/);
        if (m) {
          tokens.push({ type: "number", value: m[0] });
          i += m[0].length;
          continue;
        }
      }

      // Operators
      if (/^[=~<>+\-*/%^#.,:{}()\[\]]/.test(remaining)) {
        const m = remaining.match(/^(?:\.\.\.?|[~<>=]=|<<|>>|\/\/|[=~<>+\-*/%^#,.:{}()\[\]])/);
        if (m) {
          tokens.push({ type: "operator", value: m[0] });
          i += m[0].length;
          continue;
        }
      }

      // Word (keyword, function name, or identifier)
      const wordMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (wordMatch) {
        const word = wordMatch[0];
        if (LUA_KEYWORDS.has(word)) {
          tokens.push({ type: "keyword", value: word });
        } else {
          // Check if followed by ( to detect function calls
          const after = line.slice(i + word.length).trimStart();
          if (after.startsWith("(") || after.startsWith('"') || after.startsWith("'")) {
            tokens.push({ type: "function", value: word });
          } else {
            tokens.push({ type: "text", value: word });
          }
        }
        i += word.length;
        continue;
      }

      tokens.push({ type: "text", value: remaining[0] });
      i++;
    }

    return tokens;
  });
}

const classMap: Record<TokenType, string> = {
  keyword: "lua-keyword",
  string: "lua-string",
  comment: "lua-comment",
  number: "lua-number",
  function: "lua-function",
  operator: "lua-operator",
  text: "lua-text",
};

interface LuaHighlighterProps {
  code: string;
  className?: string;
}

export default function LuaHighlighter({ code, className = "" }: LuaHighlighterProps) {
  const tokenizedLines = tokenizeLua(code);

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
