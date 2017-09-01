const _console = console;

console = {
  log: (...items) => postMessage({ type: 'log', contents: items }),
  error: (...items) => postMessage({ type: 'error', contents: items }),
  warn: (...items) => postMessage({ type: 'warn', contents: items })
};

onmessage = ({data}) => {
  eval(data.code);
  postMessage({ type: 'end', contents: data.timerId });
};