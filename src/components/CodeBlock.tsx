import { useState } from 'react';

const KEYWORDS: Record<string, Set<string>> = {
  python: new Set(['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']),
  javascript: new Set(['async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'else', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null', 'of', 'return', 'static', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'undefined', 'var', 'void', 'while', 'yield']),
  java: new Set(['abstract', 'boolean', 'break', 'case', 'catch', 'char', 'class', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'false', 'final', 'finally', 'float', 'for', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'new', 'null', 'private', 'protected', 'public', 'record', 'return', 'static', 'super', 'switch', 'this', 'throw', 'true', 'try', 'var', 'void', 'while']),
};

function patternFor(language: string) {
  const comment = language === 'python' ? String.raw`#.*$` : String.raw`\/\/.*$`;
  return new RegExp(
    String.raw`(${comment}|"""[\s\S]*?"""|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|` + '`(?:\\\\.|[^`\\\\])*`' + String.raw`|\b\d+(?:\.\d+)?\b|[A-Za-z_]\w*)`,
    'g',
  );
}

function highlight(line: string, language: string) {
  const keywords = KEYWORDS[language] ?? new Set<string>();
  const pattern = patternFor(language);
  const nodes: Array<string | { kind: string; text: string }> = [];
  let last = 0;
  for (const match of line.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(line.slice(last, start));
    const text = match[0];
    let kind = '';
    if (text.startsWith('#') || text.startsWith('//') || text.startsWith('"""')) kind = 'comment';
    else if (text.startsWith('"') || text.startsWith("'") || text.startsWith('`')) kind = 'string';
    else if (/^\d/.test(text)) kind = 'number';
    else if (keywords.has(text)) kind = 'keyword';
    nodes.push(kind ? { kind, text } : text);
    last = start + text.length;
  }
  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

export function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="code-wrap">
      <div className="code-bar">
        <span>{language}</span>
        <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre className="code" tabIndex={0}>
        {lines.map((line, index) => (
          <div className="code-line" key={`${index}-${line}`}>
            <span className="ln">{index + 1}</span>
            <code>
              {line.length === 0
                ? ' '
                : highlight(line, language).map((part, partIndex) => (
                  typeof part === 'string'
                    ? <span key={partIndex}>{part}</span>
                    : <span key={partIndex} className={part.kind}>{part.text}</span>
                ))}
            </code>
          </div>
        ))}
      </pre>
    </div>
  );
}
