import { TrendingUp, Clock, CheckCircle2, Flame } from "lucide-react";
import type { Statistics as StatsType } from "@/types";

interface StatisticsProps {
  statistics: StatsType;
}

export function Statistics({ statistics }: StatisticsProps) {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const stats = [
    {
      label: "Today",
      value: statistics.today_pomodoros,
      suffix: "",
      icon: Flame,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
      gradient: "from-orange-500/5 to-transparent",
    },
    {
      label: "Total Sessions",
      value: statistics.total_pomodoros,
      suffix: "",
      icon: TrendingUp,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      gradient: "from-blue-500/5 to-transparent",
    },
    {
      label: "Time Focused",
      value: formatTime(statistics.total_time),
      suffix: "",
      icon: Clock,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
      gradient: "from-green-500/5 to-transparent",
    },
    {
      label: "Completed",
      value: statistics.completed_tasks,
      suffix: `/${statistics.total_tasks}`,
      icon: CheckCircle2,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      gradient: "from-purple-500/5 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-4 md:p-5 transition-all duration-300 hover:border-border hover:bg-card/50 hover:shadow-lg hover:-translate-y-0.5"
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Content */}
          <div className="relative space-y-3">
            {/* Icon and Label */}
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} aria-hidden="true" />
              </div>
            </div>
            
            {/* Value */}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold tabular-nums tracking-tight">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-sm text-muted-foreground font-medium">
                  {stat.suffix}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

