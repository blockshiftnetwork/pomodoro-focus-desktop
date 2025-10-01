export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros_completed: number;
  estimated_pomodoros: number;
  created_at: string;
}

export interface PomodoroSession {
  task_id: string | null;
  duration: number;
  completed_at: string;
  session_type: "work" | "short_break" | "long_break";
}

export interface Settings {
  work_duration: number;
  short_break: number;
  long_break: number;
  sessions_until_long_break: number;
  auto_start_breaks: boolean;
  auto_start_pomodoros: boolean;
  notifications_enabled: boolean;
}

export interface Statistics {
  total_pomodoros: number;
  total_time: number;
  completed_tasks: number;
  today_pomodoros: number;
  total_tasks: number;
}

