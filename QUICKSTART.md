# 🚀 Quick Start Guide

Get up and running with Pomodoro Focus in minutes!

## 📋 Prerequisites

Before you begin, make sure you have:

1. **Bun** installed ([Install Bun](https://bun.sh/))

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Rust** installed ([Install Rust](https://www.rust-lang.org/tools/install))

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **System Dependencies** (Platform-specific)

   **Windows:**

   - [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
   - [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (usually pre-installed on Windows 10/11)

   **macOS:**

   ```bash
   xcode-select --install
   ```

   **Linux:**

   ```bash
   # Debian/Ubuntu
   sudo apt update
   sudo apt install libwebkit2gtk-4.1-dev \
     build-essential \
     curl \
     wget \
     file \
     libssl-dev \
     libayatana-appindicator3-dev \
     librsvg2-dev

   # Fedora
   sudo dnf install webkit2gtk4.1-devel \
     openssl-devel \
     curl \
     wget \
     file \
     libappindicator-gtk3-devel \
     librsvg2-devel
   ```

## 🛠️ Installation

### Step 1: Install Dependencies

```bash
bun install
```

This will install all required frontend and build dependencies.

### Step 2: Run in Development Mode

```bash
bun run tauri:dev
```

Or use the longer form:

```bash
bun run tauri dev
```

The app will:

1. Build the frontend with Vite
2. Compile the Rust backend
3. Launch the desktop application

**First-time build** might take a few minutes as Rust compiles all dependencies.

### Step 3: Start Using the App!

1. **Add a task** - Enter what you want to work on
2. **Select the task** - Click on it in the task list
3. **Start the timer** - Click the "Start" button
4. **Focus!** - Work until the timer completes
5. **Take a break** - The app will notify you when it's time

## 🏗️ Building for Production

### Development Build (with debug symbols)

```bash
bun run tauri build --debug
```

### Production Build (optimized)

```bash
bun run tauri:build
```

Or:

```bash
bun run tauri build
```

The built application will be in:

- **Windows:** `src-tauri/target/release/bundle/nsis/`
- **macOS:** `src-tauri/target/release/bundle/dmg/` or `bundle/macos/`
- **Linux:** `src-tauri/target/release/bundle/deb/` or `bundle/appimage/`

## 🎯 Using the App

### Basic Workflow

1. **Create Tasks**

   - Type your task name
   - Set estimated pomodoros (default: 4)
   - Click "Add Task"

2. **Work on Tasks**

   - Click a task to select it
   - Press "Start" to begin a 25-minute focus session
   - Work without distractions

3. **Take Breaks**

   - Short break (5 min) after each pomodoro
   - Long break (15 min) after 4 pomodoros
   - Get notified automatically

4. **Track Progress**
   - See completed pomodoros per task
   - View daily statistics
   - Monitor total focus time

### Keyboard Shortcuts (Future Enhancement)

Currently, use mouse/touch to interact. Keyboard shortcuts coming soon!

## 🔧 Troubleshooting

### Build Errors

**Issue: "Command not found: tauri"**

```bash
bun install  # Reinstall dependencies
```

**Issue: Rust compilation errors**

```bash
# Update Rust
rustup update

# Clean and rebuild
cd src-tauri
cargo clean
cd ..
bun run tauri build
```

**Issue: Frontend not loading**

```bash
# Clear vite cache
rm -rf node_modules/.vite
bun run tauri dev
```

### Runtime Issues

**Issue: Notifications not working**

- Check system notification permissions
- On macOS: System Preferences > Notifications > Pomodoro Focus
- On Windows: Settings > System > Notifications > Pomodoro Focus

**Issue: Window too small/big**

- Delete app cache and restart
- Manually adjust in `src-tauri/tauri.conf.json`

### Development Issues

**Issue: Hot reload not working**

- Make sure port 1420 and 1421 are free
- Check firewall settings
- Restart the dev server

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [Tauri Documentation](https://tauri.app/) - Learn about Tauri
- [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique) - Understand the method

## 💡 Tips for Maximum Productivity

1. **Start small** - Begin with 2-3 tasks per day
2. **Be realistic** - Estimate pomodoros conservatively
3. **No multitasking** - Focus on ONE task at a time
4. **Take breaks seriously** - They're essential for sustained focus
5. **Review daily** - Check your statistics to improve

## 🎉 You're Ready!

You now have everything you need to be productive with Pomodoro Focus. Happy focusing! 🍅

---

**Next Steps:**

- Customize timer durations in settings
- Set up auto-start for breaks
- Track your weekly progress
