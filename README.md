# 🍅 Pomodoro Focus

A science-based desktop Pomodoro Timer app with Task Management built with Tauri, React, and Shadcn UI. Stay focused and get things done with the proven Pomodoro Technique!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Tauri](https://img.shields.io/badge/Tauri-2.0-orange?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square)
![Rust](https://img.shields.io/badge/Rust-2021-orange?style=flat-square)

## ✨ Features

### 🎯 Pomodoro Timer

- **Customizable durations** for work sessions, short breaks, and long breaks
- **Visual progress indicator** showing time remaining
- **Audio/Desktop notifications** when sessions complete
- **Auto-start options** for breaks and work sessions
- **Session counter** to track your focus streaks

### 📝 Task Management

- **Create and organize tasks** with estimated pomodoro counts
- **Track progress** with visual indicators showing completed/estimated pomodoros
- **Mark tasks as complete** with checkbox interface
- **Task selection** to focus on specific tasks during work sessions
- **Delete tasks** when no longer needed

### 📊 Statistics & Analytics

- **Today's focus count** - see your daily pomodoro count
- **Total pomodoros completed** across all sessions
- **Time focused** - total time spent in focus mode
- **Task completion rate** - completed vs total tasks
- **Real-time updates** as you complete sessions

### 🎨 Modern UI

- **Beautiful gradient design** with dark mode support
- **Responsive layout** that works on any screen size
- **Smooth animations** and transitions
- **Accessible components** built with Shadcn UI
- **Clean, distraction-free interface**

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Rust](https://www.rust-lang.org/) - Required for Tauri
- [Node.js](https://nodejs.org/) (optional, for npm compatibility)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pomodoro-focus.git
   cd pomodoro-focus
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Run in development mode**

   ```bash
   bun run tauri dev
   ```

4. **Build for production**
   ```bash
   bun run tauri build
   ```

## 🎓 What is the Pomodoro Technique?

The Pomodoro Technique is a time management method developed by Francesco Cirillo:

1. **Choose a task** you want to work on
2. **Set a timer** for 25 minutes (one "Pomodoro")
3. **Work on the task** until the timer rings
4. **Take a short break** (5 minutes)
5. **After 4 pomodoros**, take a longer break (15-30 minutes)

### Benefits:

- ✅ Improved focus and concentration
- ✅ Reduced mental fatigue
- ✅ Better time awareness
- ✅ Increased productivity
- ✅ Reduced procrastination

## 📖 How to Use

### Adding Tasks

1. Enter your task in the "What do you want to work on?" field
2. Set the estimated number of pomodoros needed
3. Click "Add Task"

### Starting a Focus Session

1. Select a task from your task list
2. Click the "Start" button on the timer
3. Focus on your task until the timer completes
4. Take a break when notified

### Customizing Settings

The default settings follow the classic Pomodoro Technique:

- **Work Duration:** 25 minutes
- **Short Break:** 5 minutes
- **Long Break:** 15 minutes
- **Sessions until Long Break:** 4

You can modify these in the Rust backend (`src-tauri/src/lib.rs`).

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend

- **Tauri 2.0** - Desktop framework
- **Rust** - Backend language
- **Serde** - Serialization
- **Chrono** - Date/time handling
- **UUID** - Unique identifiers

### Plugins

- **tauri-plugin-notification** - Desktop notifications
- **tauri-plugin-store** - Persistent storage
- **tauri-plugin-opener** - Open URLs

## 📁 Project Structure

```
pomodoro/
├── src/                        # Frontend source
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── PomodoroTimer.tsx # Timer component
│   │   ├── TaskForm.tsx      # Add task form
│   │   ├── TaskList.tsx      # Task list display
│   │   └── Statistics.tsx    # Statistics cards
│   ├── lib/                  # Utilities
│   ├── types/                # TypeScript types
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── src-tauri/                # Tauri backend
│   ├── src/
│   │   ├── lib.rs           # Rust commands
│   │   └── main.rs          # Entry point
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # Tauri config
├── package.json             # Node dependencies
└── tailwind.config.js       # Tailwind config
```

## 🔧 Available Commands

| Command               | Description              |
| --------------------- | ------------------------ |
| `bun run dev`         | Start Vite dev server    |
| `bun run build`       | Build frontend           |
| `bun run tauri dev`   | Run app in development   |
| `bun run tauri build` | Build app for production |

## 📦 Downloads & Installation

### Pre-built Binaries

Download the latest release for your platform from the [Releases](https://github.com/yourusername/pomodoro-focus/releases) page:

- **Windows**: Download the `.msi` installer or `.exe` setup file
- **Linux**: Download the `.deb` package (Ubuntu/Debian) or `.AppImage` (universal)

### Automated Builds

This project uses GitHub Actions to automatically build installers for Windows and Linux:

- ✅ Builds are triggered on every push to `main` or `develop` branches
- ✅ Release builds are created when you push a version tag (e.g., `v1.0.0`)
- ✅ All installers are automatically uploaded as release assets

See [`.github/WORKFLOWS.md`](.github/WORKFLOWS.md) for more details on the CI/CD pipeline.

## 🎨 Customization

### Changing Timer Durations

Edit the default settings in `src-tauri/src/lib.rs`:

```rust
impl Default for Settings {
    fn default() -> Self {
        Settings {
            work_duration: 25 * 60,  // Change work duration
            short_break: 5 * 60,     // Change short break
            long_break: 15 * 60,     // Change long break
            sessions_until_long_break: 4,
            // ...
        }
    }
}
```

### Styling

The app uses Tailwind CSS with custom color schemes defined in `src/index.css`. Modify the CSS variables to change colors:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Change primary color */
  --background: 0 0% 100%; /* Change background */
  /* ... */
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique) by Francesco Cirillo
- [Tauri](https://tauri.app/) - Building desktop apps
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful components
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy focusing! 🍅✨**

_Remember: The key to productivity is not working harder, but working smarter with focused intervals._
