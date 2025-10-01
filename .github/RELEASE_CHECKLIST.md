# GitHub Release Checklist

Use this checklist before pushing your project to GitHub.

## ✅ Pre-Release Checklist

### 1. Repository Configuration

- [ ] Update `package.json`:

  - [ ] Change `author` from placeholder to your actual name/email
  - [ ] Update `repository.url` with your GitHub username and repo name
  - [ ] Verify version number is correct

- [ ] Update `src-tauri/Cargo.toml`:

  - [ ] Change `authors` from placeholder to your actual name/email
  - [ ] Update `repository` URL with your GitHub username and repo name

- [ ] Update `README.md`:

  - [ ] Replace `yourusername` in clone URL with your GitHub username
  - [ ] Replace `yourusername` in all GitHub links with your GitHub username
  - [ ] Verify all badges and links work

- [ ] Review `LICENSE`:
  - [ ] Update copyright year if needed
  - [ ] Add your name/organization if desired

### 2. Code Quality

- [ ] Remove any debug code or console.logs
- [ ] Remove any commented-out code
- [ ] Ensure no hardcoded API keys or sensitive data
- [ ] Run `bun run build` to verify frontend builds
- [ ] Run `bun run tauri build` to verify app builds on your platform
- [ ] Test the built application works correctly

### 3. Documentation

- [ ] README.md is complete and accurate
- [ ] CONTRIBUTING.md reflects your contribution process
- [ ] All code has appropriate comments
- [ ] Database schema is documented (DATABASE.md)
- [ ] Features are documented (FEATURES.md)

### 4. Git Configuration

- [ ] Create `.git` repository: `git init` (if not done)
- [ ] Review `.gitignore` to ensure no sensitive files are tracked
- [ ] Verify no `node_modules`, `dist`, or `target` folders are tracked

### 5. GitHub Actions

- [ ] Review `.github/workflows/build.yml` configuration
- [ ] Review `.github/workflows/release.yml` configuration
- [ ] Ensure workflow permissions are correct

## 🚀 Initial GitHub Upload

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name your repository (suggested: `pomodoro-focus`)
3. **Do NOT** initialize with README, .gitignore, or license (you already have these)
4. Click "Create repository"

### Step 2: Push Your Code

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial release of Pomodoro Focus app"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/pomodoro-focus.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Verify Upload

- [ ] Check that all files are visible on GitHub
- [ ] Verify README.md displays correctly
- [ ] Check that LICENSE is recognized by GitHub
- [ ] Ensure no sensitive files were uploaded

### Step 4: Enable GitHub Actions

- [ ] Go to the "Actions" tab in your repository
- [ ] Enable workflows if prompted
- [ ] The build workflow should trigger automatically

### Step 5: Configure Repository Settings

- [ ] Add a description to your repository
- [ ] Add topics/tags: `pomodoro`, `productivity`, `tauri`, `react`, `desktop-app`
- [ ] Set repository visibility (Public/Private)
- [ ] Enable Issues and Discussions if desired

## 📦 Creating Your First Release

### Step 1: Update Version (if needed)

See [WORKFLOWS.md](.github/WORKFLOWS.md) for detailed instructions.

### Step 2: Create Release Tag

```bash
# Ensure all changes are committed
git add .
git commit -m "chore: prepare for v0.1.0 release"
git push

# Create and push tag
git tag -a v0.1.0 -m "Initial release v0.1.0"
git push origin v0.1.0
```

### Step 3: Monitor Release Build

- [ ] Go to Actions tab
- [ ] Watch "Release Build" workflow
- [ ] Wait for both Windows and Linux builds to complete

### Step 4: Update Release Notes

- [ ] Go to Releases tab
- [ ] Click on the new release
- [ ] Edit the release notes with actual changes
- [ ] Add screenshots if desired
- [ ] Publish the release

## 🔧 Post-Release

### Update Documentation

- [ ] Add screenshots/GIFs to README
- [ ] Update FEATURES.md with any new features
- [ ] Create a CHANGELOG.md for version history

### Community

- [ ] Consider adding CODE_OF_CONDUCT.md
- [ ] Set up issue labels
- [ ] Create issue templates (already done ✓)
- [ ] Enable Discussions for Q&A

### Marketing (Optional)

- [ ] Share on Reddit (r/productivity, r/ADHD, etc.)
- [ ] Post on Twitter/X
- [ ] Submit to Tauri Awesome list
- [ ] Add to AlternativeTo.net
- [ ] Share on Hacker News

## 🛡️ Security

- [ ] Enable Dependabot for security updates
- [ ] Set up branch protection rules for `main`
- [ ] Review and configure GitHub Security tab
- [ ] Add SECURITY.md with vulnerability reporting process

## 📝 Notes

- Replace all instances of `yourusername` with your actual GitHub username
- Replace placeholder email addresses with your real email
- Test the workflows on a test branch before releasing
- Consider setting up a development branch workflow

---

**Good luck with your release! 🍅✨**
