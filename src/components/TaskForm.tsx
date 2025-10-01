import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, HelpCircle } from "lucide-react";
import * as db from "@/lib/database";

interface TaskFormProps {
  onTaskCreated: () => void;
  trigger?: React.ReactNode;
}

export function TaskForm({ onTaskCreated, trigger }: TaskFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [estimatedPomodoros, setEstimatedPomodoros] = useState("4");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await db.createTask(
        title.trim(),
        parseInt(estimatedPomodoros) || 1
      );
      setTitle("");
      setEstimatedPomodoros("4");
      setOpen(false);
      onTaskCreated();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Task</DialogTitle>
          <DialogDescription>
            Add a task and estimate how many pomodoro sessions you'll need to complete it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-title" className="text-base font-semibold">
              Task Name
            </Label>
            <Input
              id="task-title"
              placeholder="e.g., Write project proposal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="text-base h-11"
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="estimated-pomodoros" className="text-base font-semibold">
                Estimated Pomodoros 🍅
              </Label>
              <div className="group relative">
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border z-10">
                  Each pomodoro is typically 25 minutes of focused work. Estimate how many you'll need for this task.
                </div>
              </div>
            </div>
            <Input
              id="estimated-pomodoros"
              type="number"
              min="1"
              max="20"
              value={estimatedPomodoros}
              onChange={(e) => setEstimatedPomodoros(e.target.value)}
              disabled={isLoading}
              className="text-base h-11"
            />
            <p className="text-sm text-muted-foreground">
              How many 25-minute focus sessions do you need?
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !title.trim()}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

