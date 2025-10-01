# GitHub Actions Workflows

This project includes automated GitHub Actions workflows for building and releasing the Pomodoro Focus application.

## Available Workflows

### 1. Build Windows and Linux (`build.yml`)

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual trigger via GitHub Actions UI

**What it does:**

- Builds the app for Windows (MSI and NSIS installers)
- Builds the app for Linux (DEB package and AppImage)
- Uploads build artifacts for download

**Artifacts produced:**

- `pomodoro-focus-windows-msi` - Windows MSI installer
- `pomodoro-focus-windows-nsis` - Windows NSIS installer (optional)
- `pomodoro-focus-linux-deb` - Debian package for Ubuntu/Debian
- `pomodoro-focus-linux-appimage` - AppImage for any Linux distribution

### 2. Release Build (`release.yml`)

**Triggers:**

- Push a tag matching `v*.*.*` (e.g., `v1.0.0`, `v0.2.1`)
- Manual trigger via GitHub Actions UI

**What it does:**

- Creates a GitHub Release
- Builds installers for Windows and Linux
- Automatically uploads installers to the release

## How to Create a Release

### Step 1: Update Version Numbers

1. Update version in `package.json`:

   ```json
   {
     "version": "1.0.0"
   }
   ```

2. Update version in `src-tauri/tauri.conf.json`:

   ```json
   {
     "version": "1.0.0"
   }
   ```

3. Update version in `src-tauri/Cargo.toml`:
   ```toml
   [package]
   version = "1.0.0"
   ```

### Step 2: Commit and Push

```bash
git add .
git commit -m "chore: bump version to 1.0.0"
git push origin main
```

### Step 3: Create and Push Tag

```bash
# Create a tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag to GitHub
git push origin v1.0.0
```

### Step 4: Monitor the Release

1. Go to the **Actions** tab in your GitHub repository
2. Watch the `Release Build` workflow run
3. Once complete, check the **Releases** section
4. Your release will be published with all installers attached

## Manual Workflow Trigger

You can manually trigger workflows from the GitHub Actions UI:

1. Go to the **Actions** tab
2. Select the workflow you want to run
3. Click **Run workflow**
4. Choose the branch and click **Run workflow**

## Build Artifacts

After a successful build workflow run:

1. Go to the **Actions** tab
2. Click on the completed workflow run
3. Scroll down to the **Artifacts** section
4. Download the installers you need

## Troubleshooting

### Build Fails on Windows

- Check that all dependencies are properly installed
- Ensure Rust toolchain is correctly set up
- Verify the Windows code signing certificate (if configured)

### Build Fails on Linux

- Ensure all system dependencies are installed
- Check that the AppImage and DEB bundle targets are configured in Tauri

### Release Asset Upload Fails

- Verify the asset paths match the actual build output
- Check that the GitHub token has proper permissions
- Ensure the file names don't contain special characters

## Optimizations

The workflows include:

- **Rust caching** - Speeds up builds by caching Rust dependencies
- **Parallel builds** - Windows and Linux builds run simultaneously
- **Conditional steps** - Optional installers won't fail the build
- **Manual triggers** - Run builds on-demand without commits

## Security Notes

- The workflows use `secrets.GITHUB_TOKEN` which is automatically provided by GitHub
- No additional secrets are required for basic building
- For code signing, you'll need to add signing certificates as secrets

## Customization

To customize the workflows:

1. Edit `.github/workflows/build.yml` for build settings
2. Edit `.github/workflows/release.yml` for release automation
3. Adjust artifact paths based on your Tauri configuration
4. Modify release notes template in `release.yml`

## Support

If you encounter issues with the workflows:

1. Check the workflow logs in the Actions tab
2. Verify all configuration files are correct
3. Consult the [Tauri documentation](https://tauri.app/v1/guides/building/)
4. Open an issue if you need help
