import Database from "@tauri-apps/plugin-sql";
import type { Task, PomodoroSession, Settings } from "@/types";

let db: Database | null = null;

// Inicializar la base de datos
export async function initDatabase(): Promise<Database> {
  if (!db) {
    db = await Database.load("sqlite:pomodoro.db");
  }
  return db;
}

// ==================== TASKS ====================

export async function createTask(
  title: string,
  estimatedPomodoros: number
): Promise<Task> {
  const database = await initDatabase();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await database.execute(
    "INSERT INTO tasks (id, title, completed, pomodoros_completed, estimated_pomodoros, created_at) VALUES ($1, $2, 0, 0, $3, $4)",
    [id, title, estimatedPomodoros, createdAt]
  );

  return {
    id,
    title,
    completed: false,
    pomodoros_completed: 0,
    estimated_pomodoros: estimatedPomodoros,
    created_at: createdAt,
  };
}

export async function getTasks(): Promise<Task[]> {
  const database = await initDatabase();
  const result = await database.select<Task[]>(
    "SELECT * FROM tasks ORDER BY created_at DESC"
  );

  return result.map((task) => ({
    ...task,
    completed: Boolean(task.completed),
  }));
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, "id" | "created_at">>
): Promise<void> {
  const database = await initDatabase();
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (updates.title !== undefined) {
    fields.push(`title = $${paramIndex++}`);
    values.push(updates.title);
  }
  if (updates.completed !== undefined) {
    fields.push(`completed = $${paramIndex++}`);
    values.push(updates.completed ? 1 : 0);
  }
  if (updates.estimated_pomodoros !== undefined) {
    fields.push(`estimated_pomodoros = $${paramIndex++}`);
    values.push(updates.estimated_pomodoros);
  }
  if (updates.pomodoros_completed !== undefined) {
    fields.push(`pomodoros_completed = $${paramIndex++}`);
    values.push(updates.pomodoros_completed);
  }

  if (fields.length > 0) {
    values.push(id);
    await database.execute(
      `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${paramIndex}`,
      values
    );
  }
}

export async function deleteTask(id: string): Promise<void> {
  const database = await initDatabase();
  await database.execute("DELETE FROM tasks WHERE id = $1", [id]);
}

export async function incrementTaskPomodoro(id: string): Promise<void> {
  const database = await initDatabase();
  await database.execute(
    "UPDATE tasks SET pomodoros_completed = pomodoros_completed + 1 WHERE id = $1",
    [id]
  );
}

// ==================== SESSIONS ====================

export async function saveSession(
  taskId: string | null,
  duration: number,
  sessionType: "work" | "short_break" | "long_break"
): Promise<void> {
  const database = await initDatabase();
  const completedAt = new Date().toISOString();

  await database.execute(
    "INSERT INTO sessions (task_id, duration, completed_at, session_type) VALUES ($1, $2, $3, $4)",
    [taskId, duration, completedAt, sessionType]
  );

  // Si es una sesión de trabajo, incrementar el contador de pomodoros
  if (sessionType === "work" && taskId) {
    await incrementTaskPomodoro(taskId);
  }
}

export async function getSessions(): Promise<PomodoroSession[]> {
  const database = await initDatabase();
  return await database.select<PomodoroSession[]>(
    "SELECT task_id, duration, completed_at, session_type FROM sessions ORDER BY completed_at DESC"
  );
}

export async function getTodaySessions(): Promise<PomodoroSession[]> {
  const database = await initDatabase();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  return await database.select<PomodoroSession[]>(
    "SELECT task_id, duration, completed_at, session_type FROM sessions WHERE completed_at >= $1 ORDER BY completed_at DESC",
    [todayStr]
  );
}

// ==================== SETTINGS ====================

export async function getSettings(): Promise<Settings> {
  const database = await initDatabase();
  const result = await database.select<any[]>(
    "SELECT * FROM settings WHERE id = 1"
  );

  if (result.length === 0) {
    // Retornar valores por defecto si no existe
    return {
      work_duration: 1500,
      short_break: 300,
      long_break: 900,
      sessions_until_long_break: 4,
      auto_start_breaks: false,
      auto_start_pomodoros: false,
      notifications_enabled: true,
    };
  }

  const settings = result[0];
  return {
    work_duration: settings.work_duration,
    short_break: settings.short_break,
    long_break: settings.long_break,
    sessions_until_long_break: settings.sessions_until_long_break,
    auto_start_breaks: Boolean(settings.auto_start_breaks),
    auto_start_pomodoros: Boolean(settings.auto_start_pomodoros),
    notifications_enabled: Boolean(settings.notifications_enabled),
  };
}

export async function updateSettings(
  settings: Partial<Settings>
): Promise<void> {
  const database = await initDatabase();
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (settings.work_duration !== undefined) {
    fields.push(`work_duration = $${paramIndex++}`);
    values.push(settings.work_duration);
  }
  if (settings.short_break !== undefined) {
    fields.push(`short_break = $${paramIndex++}`);
    values.push(settings.short_break);
  }
  if (settings.long_break !== undefined) {
    fields.push(`long_break = $${paramIndex++}`);
    values.push(settings.long_break);
  }
  if (settings.sessions_until_long_break !== undefined) {
    fields.push(`sessions_until_long_break = $${paramIndex++}`);
    values.push(settings.sessions_until_long_break);
  }
  if (settings.auto_start_breaks !== undefined) {
    fields.push(`auto_start_breaks = $${paramIndex++}`);
    values.push(settings.auto_start_breaks ? 1 : 0);
  }
  if (settings.auto_start_pomodoros !== undefined) {
    fields.push(`auto_start_pomodoros = $${paramIndex++}`);
    values.push(settings.auto_start_pomodoros ? 1 : 0);
  }
  if (settings.notifications_enabled !== undefined) {
    fields.push(`notifications_enabled = $${paramIndex++}`);
    values.push(settings.notifications_enabled ? 1 : 0);
  }

  if (fields.length > 0) {
    await database.execute(
      `UPDATE settings SET ${fields.join(", ")} WHERE id = 1`,
      values
    );
  }
}

// ==================== STATISTICS ====================

export async function getStatistics() {
  const database = await initDatabase();

  // Total de pomodoros (sesiones de trabajo)
  const totalPomodorosResult = await database.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM sessions WHERE session_type = 'work'"
  );
  const totalPomodoros = totalPomodorosResult[0]?.count || 0;

  // Tiempo total enfocado
  const totalTimeResult = await database.select<{ total: number }[]>(
    "SELECT SUM(duration) as total FROM sessions"
  );
  const totalTime = totalTimeResult[0]?.total || 0;

  // Tareas completadas
  const completedTasksResult = await database.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM tasks WHERE completed = 1"
  );
  const completedTasks = completedTasksResult[0]?.count || 0;

  // Total de tareas
  const totalTasksResult = await database.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM tasks"
  );
  const totalTasks = totalTasksResult[0]?.count || 0;

  // Pomodoros de hoy
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  const todayPomodorosResult = await database.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM sessions WHERE session_type = 'work' AND completed_at >= $1",
    [todayStr]
  );
  const todayPomodoros = todayPomodorosResult[0]?.count || 0;

  return {
    total_pomodoros: totalPomodoros,
    total_time: totalTime,
    completed_tasks: completedTasks,
    today_pomodoros: todayPomodoros,
    total_tasks: totalTasks,
  };
}

