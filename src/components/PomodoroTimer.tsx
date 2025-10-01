import { useState, useEffect, useRef } from "react";
import { sendNotification } from "@tauri-apps/plugin-notification";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import type { Task, Settings } from "@/types";
import * as db from "@/lib/database";

interface PomodoroTimerProps {
  selectedTask: Task | null;
  settings: Settings;
  onSessionComplete: () => void;
}

type TimerMode = "work" | "short_break" | "long_break";

export function PomodoroTimer({ selectedTask, settings, onSessionComplete }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(settings.work_duration);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const getDuration = (timerMode: TimerMode): number => {
    switch (timerMode) {
      case "work":
        return settings.work_duration;
      case "short_break":
        return settings.short_break;
      case "long_break":
        return settings.long_break;
    }
  };

  useEffect(() => {
    setTimeLeft(getDuration(mode));
  }, [mode, settings]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = async () => {
    setIsRunning(false);
    
    // Save session
    try {
      await db.saveSession(
        mode === "work" ? selectedTask?.id || null : null,
        getDuration(mode),
        mode
      );

      if (mode === "work") {
        setCompletedSessions((prev) => prev + 1);
        
        // Send notification
        if (settings.notifications_enabled) {
          await sendNotification({
            title: "Pomodoro Complete!",
            body: "Great work! Time for a break.",
          });
        }

        // Determine next break type
        const nextMode =
          (completedSessions + 1) % settings.sessions_until_long_break === 0
            ? "long_break"
            : "short_break";
        setMode(nextMode);

        if (settings.auto_start_breaks) {
          setIsRunning(true);
        }
      } else {
        // After break, go back to work
        if (settings.notifications_enabled) {
          await sendNotification({
            title: "Break Complete!",
            body: "Ready to focus again?",
          });
        }
        setMode("work");

        if (settings.auto_start_pomodoros) {
          setIsRunning(true);
        }
      }

      onSessionComplete();
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(getDuration(newMode));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((getDuration(mode) - timeLeft) / getDuration(mode)) * 100;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-border hover:bg-card/50">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
          {mode === "work" && <Brain className="h-6 w-6 text-primary" />}
          {mode !== "work" && <Coffee className="h-6 w-6 text-primary" />}
          {mode === "work" ? "Focus Time" : mode === "short_break" ? "Short Break" : "Long Break"}
        </h2>
      </div>

      <div className="space-y-6">
        {selectedTask && mode === "work" && (
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Task</p>
            <p className="font-medium text-foreground">{selectedTask.title}</p>
          </div>
        )}
        
        {!selectedTask && mode === "work" && (
          <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/40">
            <p className="text-sm text-muted-foreground">No task selected. Select a task to track your progress!</p>
          </div>
        )}

        <div className="text-center py-4">
          <div 
            className="text-8xl md:text-9xl font-bold font-mono mb-6 tabular-nums tracking-tight"
            role="timer"
            aria-live="polite"
            aria-atomic="true"
          >
            {formatTime(timeLeft)}
          </div>
          <Progress value={progress} className="h-4 rounded-full" aria-label="Timer progress" />
        </div>

        <div className="flex justify-center gap-3">
          <Button 
            onClick={toggleTimer} 
            size="lg" 
            className="min-w-[140px] text-base font-semibold"
            aria-label={isRunning ? "Pause timer" : "Start timer"}
          >
            {isRunning ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Start
              </>
            )}
          </Button>
          <Button 
            onClick={resetTimer} 
            size="lg" 
            variant="outline"
            aria-label="Reset timer"
            className="px-4"
          >
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset</span>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Button
            onClick={() => switchMode("work")}
            variant={mode === "work" ? "default" : "outline"}
            size="sm"
            className="min-w-[100px]"
            aria-label="Switch to work mode"
            aria-pressed={mode === "work"}
          >
            <Brain className="mr-1.5 h-4 w-4" />
            Work
          </Button>
          <Button
            onClick={() => switchMode("short_break")}
            variant={mode === "short_break" ? "default" : "outline"}
            size="sm"
            className="min-w-[100px]"
            aria-label="Switch to short break mode"
            aria-pressed={mode === "short_break"}
          >
            <Coffee className="mr-1.5 h-4 w-4" />
            Short
          </Button>
          <Button
            onClick={() => switchMode("long_break")}
            variant={mode === "long_break" ? "default" : "outline"}
            size="sm"
            className="min-w-[100px]"
            aria-label="Switch to long break mode"
            aria-pressed={mode === "long_break"}
          >
            <Coffee className="mr-1.5 h-4 w-4" />
            Long
          </Button>
        </div>

        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
            <span className="text-sm text-muted-foreground">Sessions completed:</span>
            <span className="text-lg font-bold text-foreground">{completedSessions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

