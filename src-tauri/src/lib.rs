use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    id: String,
    title: String,
    completed: bool,
    pomodoros_completed: u32,
    estimated_pomodoros: u32,
    created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PomodoroSession {
    task_id: Option<String>,
    duration: u32,
    completed_at: String,
    session_type: String, // "work", "short_break", "long_break"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Settings {
    work_duration: u32, // in seconds
    short_break: u32,   // in seconds
    long_break: u32,    // in seconds
    sessions_until_long_break: u32,
    auto_start_breaks: bool,
    auto_start_pomodoros: bool,
    notifications_enabled: bool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:pomodoro.db",
                    vec![tauri_plugin_sql::Migration {
                        version: 1,
                        description: "create initial tables",
                        sql: include_str!("../migrations/001_initial.sql"),
                        kind: tauri_plugin_sql::MigrationKind::Up,
                    }],
                )
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
