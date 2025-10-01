import { useState, useEffect } from "react";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { Statistics } from "@/components/Statistics";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import type { Task, Settings, Statistics as StatsType } from "@/types";
import { Plus } from "lucide-react";
import * as db from "@/lib/database";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [settings, setSettings] = useState<Settings>({
    work_duration: 25 * 60,
    short_break: 5 * 60,
    long_break: 15 * 60,
    sessions_until_long_break: 4,
    auto_start_breaks: false,
    auto_start_pomodoros: false,
    notifications_enabled: true,
  });
  const [statistics, setStatistics] = useState<StatsType>({
    total_pomodoros: 0,
    total_time: 0,
    completed_tasks: 0,
    today_pomodoros: 0,
    total_tasks: 0,
  });

  useEffect(() => {
    loadTasks();
    loadSettings();
    loadStatistics();
  }, []);

  const loadTasks = async () => {
    try {
      const loadedTasks = await db.getTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const loadSettings = async () => {
    try {
      const loadedSettings = await db.getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const loadStatistics = async () => {
    try {
      const stats = await db.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error("Failed to load statistics:", error);
    }
  };

  const handleTasksChange = () => {
    loadTasks();
    loadStatistics();
  };

  const handleSessionComplete = () => {
    loadStatistics();
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <header className="relative text-center mb-6 md:mb-8">
          <div className="absolute right-0 top-0">
            <ModeToggle />
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Stay focused and accomplish more with the proven Pomodoro Technique
          </p>
        </header>

        {/* Statistics */}
        <section aria-label="Statistics" className="mb-6 md:mb-8">
          <Statistics statistics={statistics} />
        </section>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column - Timer */}
          <section aria-label="Pomodoro Timer">
            <PomodoroTimer
              selectedTask={selectedTask}
              settings={settings}
              onSessionComplete={handleSessionComplete}
            />
          </section>

          {/* Right Column - Tasks */}
          <section aria-label="Task list">
            <TaskList
              tasks={tasks}
              selectedTask={selectedTask}
              onTaskSelect={setSelectedTask}
              onTasksChange={handleTasksChange}
            />
          </section>
        </main>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-50">
        <TaskForm
          onTaskCreated={handleTasksChange}
          trigger={
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110"
              aria-label="Add new task"
            >
              <Plus className="h-6 w-6" />
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default App;
