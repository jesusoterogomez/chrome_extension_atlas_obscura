/**
 * Logs output to console if DEBUG is set to true in localStorage.
 *
 * Copy this into the console for quick enabling:
 * localStorage.setItem('DEBUG', true);
 */

const DEBUG_STORAGE_KEY = "DEBUG";

enum Level {
    LOG = "log",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
}

const outputToConsole = (level: Level) => {
    if (localStorage.getItem(DEBUG_STORAGE_KEY)) {
        return console[level].bind(null, "[debug]");
    }

    return () => {};
};

export const logger = {
    log: outputToConsole(Level.LOG),
    info: outputToConsole(Level.LOG),
    warn: outputToConsole(Level.LOG),
    error: outputToConsole(Level.LOG),
};
