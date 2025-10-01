-- Tabla de tareas
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    pomodoros_completed INTEGER NOT NULL DEFAULT 0,
    estimated_pomodoros INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL
);

-- Tabla de sesiones de pomodoro
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT,
    duration INTEGER NOT NULL,
    completed_at TEXT NOT NULL,
    session_type TEXT NOT NULL CHECK(session_type IN ('work', 'short_break', 'long_break')),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

-- Tabla de configuración
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    work_duration INTEGER NOT NULL DEFAULT 1500,
    short_break INTEGER NOT NULL DEFAULT 300,
    long_break INTEGER NOT NULL DEFAULT 900,
    sessions_until_long_break INTEGER NOT NULL DEFAULT 4,
    auto_start_breaks INTEGER NOT NULL DEFAULT 0,
    auto_start_pomodoros INTEGER NOT NULL DEFAULT 0,
    notifications_enabled INTEGER NOT NULL DEFAULT 1
);

-- Insertar configuración por defecto
INSERT OR IGNORE INTO settings (id, work_duration, short_break, long_break, sessions_until_long_break, auto_start_breaks, auto_start_pomodoros, notifications_enabled)
VALUES (1, 1500, 300, 900, 4, 0, 0, 1);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_completed_at ON sessions(completed_at);
CREATE INDEX IF NOT EXISTS idx_sessions_task_id ON sessions(task_id);
CREATE INDEX IF NOT EXISTS idx_sessions_type ON sessions(session_type);

