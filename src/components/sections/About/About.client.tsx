'use client';

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { TerminalCard } from '@/components/shared/TerminalCard/TerminalCard';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import styles from './About.module.sass';

// The `.client` suffix is a reading convention only - the 'use client' directive
// above is what makes this a Client Component.
interface AboutTerminalProps {
  user: string;
  sectionTitle: string;
  terminalTitle: string;
  inputLabel: string;
  unknownCommandHint: string;
  shellCommands: Record<string, string[]>;
  initialCommands: string[];
}

interface TerminalLine {
  type: 'command' | 'output';
  text: string;
}

const VALID_DIRS = new Set(['~', '~/skills', '~/projects']);

function resolvePath(cwd: string, target: string): string {
  if (target === '~' || target === '') {
    return '~';
  }
  if (target === '..') {
    const lastSlash = cwd.lastIndexOf('/');
    return lastSlash > 0 ? cwd.slice(0, lastSlash) : '~';
  }
  if (target.startsWith('~/')) {
    return target.replace(/\/+$/, '');
  }
  const clean = target.replace(/\/+$/, '');
  return cwd === '~' ? `~/${clean}` : `${cwd}/${clean}`;
}

function makePrompt(user: string, cwd: string): string {
  return `${user}:${cwd}$`;
}

function cwdToPrefix(cwd: string): string {
  if (cwd === '~') {
    return '';
  }
  return cwd.replace('~/', '') + '/';
}

export function AboutTerminal({
  user,
  sectionTitle,
  terminalTitle,
  inputLabel,
  unknownCommandHint,
  shellCommands,
  initialCommands,
}: AboutTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);
  const [cwd, setCwd] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const prompt = makePrompt(user, cwd);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  const resolveCommand = useCallback((trimmed: string, currentCwd: string): string => {
    const prefix = cwdToPrefix(currentCwd);
    if (!prefix) {
      return trimmed;
    }

    if (trimmed === 'ls') {
      return `ls ${prefix.replace(/\/$/, '')}/`;
    }

    if (trimmed === 'ls -la' || trimmed === 'ls -l' || trimmed === 'ls -al') {
      return `ls -la ${prefix.replace(/\/$/, '')}/`;
    }

    const parts = trimmed.split(' ');
    if (parts[0] === 'cat' && parts[1] && !parts[1].includes('/')) {
      return `cat ${prefix}${parts[1]}`;
    }

    return trimmed;
  }, []);

  const executeCommand = useCallback(
    (cmd: string, currentCwd?: string): { lines: TerminalLine[]; newCwd?: string } => {
      const activeCwd = currentCwd ?? cwd;
      const trimmed = cmd.trim();
      const promptStr = makePrompt(user, activeCwd);
      const newLines: TerminalLine[] = [{ type: 'command', text: `${promptStr} ${trimmed}` }];

      if (trimmed === 'clear' || trimmed === 'cls') {
        return { lines: [] };
      }

      if (trimmed === '') {
        return { lines: newLines };
      }

      if (trimmed === 'cd' || trimmed.startsWith('cd ')) {
        const target = trimmed === 'cd' ? '~' : trimmed.slice(3).trim();
        const resolved = resolvePath(activeCwd, target);

        if (VALID_DIRS.has(resolved)) {
          return { lines: newLines, newCwd: resolved };
        } else {
          newLines.push({ type: 'output', text: `bash: cd: ${target}: No such file or directory` });
          return { lines: newLines };
        }
      }

      if (trimmed === 'pwd') {
        newLines.push({ type: 'output', text: activeCwd.replace('~', '/home/root') });
        return { lines: newLines };
      }

      let resolved = resolveCommand(trimmed, activeCwd);

      resolved = resolved.replace(/^ls -(l|al|a)\b/, 'ls -la');

      const output =
        shellCommands[resolved] ??
        shellCommands[resolved.replace(/\/?$/, '/')] ??
        shellCommands[resolved.replace(/\/$/, '')] ??
        shellCommands[trimmed] ??
        shellCommands[trimmed.replace(/\/?$/, '/')] ??
        shellCommands[trimmed.replace(/\/$/, '')];

      if (output) {
        for (const line of output) {
          newLines.push({ type: 'output', text: line });
        }
      } else {
        newLines.push({ type: 'output', text: `bash: ${trimmed.split(' ')[0]}: command not found` });
        newLines.push({ type: 'output', text: unknownCommandHint });
      }

      return { lines: newLines };
    },
    [cwd, shellCommands, resolveCommand],
  );

  useEffect(() => {
    if (initialized) {
      return;
    }
    setInitialized(true);

    const initialLines: TerminalLine[] = [];
    let currentCwd = '~';
    for (const cmd of initialCommands) {
      const result = executeCommand(cmd, currentCwd);
      initialLines.push(...result.lines);
      if (result.newCwd) {
        currentCwd = result.newCwd;
      }
    }
    setLines(initialLines);
    setCwd(currentCwd);
  }, [initialized, initialCommands, executeCommand]);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleSubmit = () => {
    const trimmed = input.trim();

    if (trimmed === 'clear' || trimmed === 'cls') {
      setLines([]);
      setInput('');
      if (trimmed) {
        setHistory((prev) => [...prev, trimmed]);
      }
      setHistoryIndex(-1);
      return;
    }

    const result = executeCommand(input);
    setLines((prev) => [...prev, ...result.lines]);
    if (result.newCwd) {
      setCwd(result.newCwd);
    }
    if (trimmed) {
      setHistory((prev) => [...prev, trimmed]);
    }
    setInput('');
    setHistoryIndex(-1);
  };

  const handleTab = useCallback(
    (current: string) => {
      const prefix = cwdToPrefix(cwd);
      const commands = Object.keys(shellCommands);

      const fileCommands = new Set(['cat', 'ls']);
      const localCommands: string[] = [];
      for (const cmd of commands) {
        const base = cmd.split(' ')[0];
        const hasArg = cmd.includes(' ');

        if (prefix && cmd.startsWith(`${base} ${prefix}`)) {
          localCommands.push(cmd.replace(` ${prefix}`, ' '));
        } else if (!prefix) {
          localCommands.push(cmd);
        } else if (!hasArg || !fileCommands.has(base)) {
          localCommands.push(cmd);
        }
      }

      const builtins = ['clear', 'cls', 'pwd'];
      if (cwd === '~') {
        builtins.push('cd projects', 'cd skills');
      } else {
        builtins.push('cd ..', 'cd ~');
      }
      const allCommands = [...localCommands, ...builtins];

      const matches = allCommands.filter((cmd) => cmd.startsWith(current) && cmd !== current);

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        let commonPrefix = current;
        for (let i = current.length; ; i++) {
          const char = matches[0][i];
          if (!char || !matches.every((m) => m[i] === char)) {
            break;
          }
          commonPrefix += char;
        }

        if (commonPrefix.length > current.length) {
          setInput(commonPrefix);
        } else {
          const baseCmd = current.includes(' ') ? current.slice(0, current.lastIndexOf(' ') + 1) : '';
          const display = baseCmd ? matches.map((m) => m.slice(baseCmd.length)) : matches;
          setLines((prev) => [
            ...prev,
            { type: 'command', text: `${prompt} ${current}` },
            { type: 'output', text: display.join('  ') },
          ]);
        }
      }
    },
    [cwd, shellCommands, prompt],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTab(input);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) {
        return;
      }
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) {
        return;
      }
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="about.md" title={sectionTitle} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <TerminalCard title={terminalTitle}>
            <div className={styles.terminal} ref={terminalRef} onClick={handleTerminalClick} role="log" aria-live="polite">
              {lines.map((line, i) => (
                <p key={i} className={line.type === 'command' ? styles.commandLine : styles.outputLine}>
                  {line.text || '\u00A0'}
                </p>
              ))}
              <div className={styles.inputLine}>
                <span className={styles.prompt}>{prompt}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={inputLabel}
                />
              </div>
            </div>
          </TerminalCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
