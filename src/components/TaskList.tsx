import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Target, AlertCircle } from "lucide-react";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";
import * as db from "@/lib/database";
import { useState } from "react";

interface TaskListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onTaskSelect: (task: Task | null) => void;
  onTasksChange: () => void;
}

export function TaskList({ tasks, selectedTask, onTaskSelect, onTasksChange }: TaskListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleToggleComplete = async (task: Task) => {
    try {
      await db.updateTask(task.id, {
        completed: !task.completed,
      });
      onTasksChange();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await db.deleteTask(taskId);
      if (selectedTask?.id === taskId) {
        onTaskSelect(null);
      }
      setDeleteConfirm(null);
      onTasksChange();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const TaskItem = ({ task }: { task: Task }) => {
    const isSelected = selectedTask?.id === task.id;
    const isDeleteConfirming = deleteConfirm === task.id;
    const progress = task.estimated_pomodoros > 0
      ? (task.pomodoros_completed / task.estimated_pomodoros) * 100
      : 0;

    return (
      <div
        className={cn(
          "group relative flex items-center gap-3 p-4 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-200",
          "hover:bg-card/50 hover:border-border hover:shadow-md hover:-translate-y-0.5",
          isSelected && "bg-primary/5 border-primary shadow-sm ring-2 ring-primary/20",
          task.completed && "opacity-60 hover:opacity-75",
        )}
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => handleToggleComplete(task)}
          aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          className="shrink-0"
        />
        <div
          className="flex-1 cursor-pointer min-w-0"
          onClick={() => onTaskSelect(isSelected ? null : task)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onTaskSelect(isSelected ? null : task);
            }
          }}
          aria-label={`Select task: ${task.title}`}
        >
          <div className={cn("font-medium mb-1.5 break-words", task.completed && "line-through text-muted-foreground")}>
            {task.title}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {task.pomodoros_completed} / {task.estimated_pomodoros} 🍅
            </div>
            <div className="flex-1 h-2 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  progress >= 100 ? "bg-green-500" : "bg-primary"
                )}
                style={{ width: `${Math.min(progress, 100)}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Task progress"
              />
            </div>
          </div>
        </div>
        {isSelected && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 shrink-0">
            <Target className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-primary">Active</span>
          </div>
        )}
        {!isDeleteConfirming ? (
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirm(task.id);
            }}
            aria-label={`Delete task: ${task.title}`}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        ) : (
          <div className="flex gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteTask(task.id)}
              className="h-8 px-2 text-xs"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirm(null)}
              className="h-8 px-2 text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-border hover:bg-card/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <div className="text-sm text-muted-foreground">
          {activeTasks.length} active
        </div>
      </div>

      {/* Content */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-1 font-semibold">No tasks yet</p>
          <p className="text-sm text-muted-foreground">Click the <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mx-1 align-middle">+</span> button to add your first task!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                Active Tasks
              </h3>
              <div className="space-y-2">
                {activeTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-green-500" />
                Completed ({completedTasks.length})
              </h3>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

