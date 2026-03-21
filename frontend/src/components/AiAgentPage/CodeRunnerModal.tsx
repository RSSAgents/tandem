import { SandpackCodeEditor, SandpackProvider, useSandpack } from '@codesandbox/sandpack-react';
import { Modal, useMantineColorScheme } from '@mantine/core';
import { IconPlayerPlay, IconTrash } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';

interface CodeRunnerModalProps {
  opened: boolean;
  onClose: () => void;
  code: string;
  language: string;
}

interface LogEntry {
  text: string;
  type: 'log' | 'error' | 'warn';
}

const ConsolePanel = () => {
  const { sandpack } = useSandpack();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t } = useTranslation('aiAgent');

  const handleRun = () => {
    const activeFile = Object.keys(sandpack.files).find(
      (f) => f.endsWith('.js') || f.endsWith('.ts'),
    );
    const currentCode = activeFile ? sandpack.files[activeFile]?.code : '';
    if (!currentCode) return;

    setLogs([]);

    const encoded = btoa(unescape(encodeURIComponent(currentCode)));

    const html = `<!DOCTYPE html><html><head><script>
      const captured = [];
      console.log = (...args) => captured.push({ text: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '), type: 'log' });
      console.error = (...args) => captured.push({ text: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '), type: 'error' });
      console.warn = (...args) => captured.push({ text: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '), type: 'warn' });
      try { eval(decodeURIComponent(escape(atob("${encoded}")))); } catch(e) { captured.push({ text: e.message, type: 'error' }); }
      parent.postMessage({ type: 'sandbox-logs', logs: captured }, '*');
    ${'<'}/script></head><body></body></html>`;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'sandbox-logs') {
        setLogs(e.data.logs);
        window.removeEventListener('message', handler);
      }
    };
    window.addEventListener('message', handler);

    iframe.srcdoc = html;
  };

  return (
    <div className={classes.consoleWrapper}>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        className={classes.consoleSandboxIframe}
        title="code-runner-sandbox"
      />
      <div className={`${classes.sandpackConsole} ${classes.sandpackConsolePane}`}>
        {logs.length === 0 ? (
          <span className={classes.consolePlaceholder}>
            {t('codeRunnerModal.placeholder')}
          </span>
        ) : (
          logs.map((entry, i) => (
            <div
              key={i}
              className={`${classes.consoleLogEntry} ${entry.type === 'error' ? classes.consoleLogEntryError : entry.type === 'warn' ? classes.consoleLogEntryWarn : classes.consoleLogEntryLog}`}
            >
              {entry.text}
            </div>
          ))
        )}
      </div>
      <div className={classes.consoleActionsBar}>
        <button
          onClick={() => setLogs([])}
          title={t('codeRunnerModal.clear')}
          className={classes.consoleRunButton}
        >
          <IconTrash size={14} />
        </button>
        <button
          onClick={handleRun}
          title={t('codeRunnerModal.run')}
          className={classes.consoleRunButton}
        >
          <IconPlayerPlay size={14} />
        </button>
      </div>
    </div>
  );
};

export const CodeRunnerModal = ({ opened, onClose, code, language }: CodeRunnerModalProps) => {
  const { t } = useTranslation('aiAgent');
  const { colorScheme } = useMantineColorScheme();

  const getFiles = (): Record<string, string> => {
    if (language === 'html') {
      return { '/index.html': code };
    }
    if (language === 'css') {
      return {
        '/index.html': `<!DOCTYPE html>\n<html><head><link rel='stylesheet' href='/styles.css'></head><body>\n<div class='demo'>${t('codeRunnerModal.styledElement')}</div>\n</body></html>`,
        '/styles.css': code,
      };
    }
    return { '/index.js': code };
  };

  return (
    <Modal opened={opened} onClose={onClose} title={t('codeRunnerModal.title')} size="xl" centered>
      {opened && (
        <SandpackProvider
          template="vanilla"
          files={getFiles()}
          theme={colorScheme === 'dark' ? 'dark' : 'light'}
        >
          <SandpackCodeEditor className={classes.sandpackEditor} showLineNumbers />
          <ConsolePanel />
        </SandpackProvider>
      )}
    </Modal>
  );
};
