# Git Workflow for the OpayCam Team

**All developers must follow these steps to keep the repository clean and ensure the Antigravity IDE rule is respected.**

---

## 1️⃣ Clone the repository (once)
```bash
# Choose a folder where you keep your projects
cd ~/projects

# Clone the remote repo (replace with the actual URL)
git clone https://github.com/your-org/opaycam.git
cd opaycam
```

---

## 2️⃣ Work on the **dev** branch
```bash
# Make sure you have the latest main first
git checkout main
git pull origin main

# Switch to the dev branch (or create it if it doesn’t exist locally)
git checkout dev          # creates it locally if needed
git pull origin dev       # fetch any new commits from the remote
```

> **Why dev?**
> - `main` stays stable for production releases.
> - All new work happens on `dev` and is reviewed via PRs.

---

## 3️⃣ Open the project in **Antigravity IDE** (the only allowed IDE)
1. Launch Antigravity IDE (the workspace you’re already using).
2. *File → Open Folder* and select the folder you just cloned (`…/opaycam`).
3. Antigravity will index the repo and give you the built‑in AI assistance that is **project‑aware**.

> **Do NOT** use VS Code, Cursor, or any other editor. Do NOT use external AI tools.

---

## 4️⃣ Daily sync – pull the latest `dev`
```bash
git checkout dev
git pull origin dev
```
If someone else has pushed new commits, this brings them into your local copy.

---

## 5️⃣ Typical feature workflow (e.g., adding missing translations)
```bash
# 5.1 Start from the latest dev
git checkout dev && git pull origin dev

# 5.2 Create a short‑lived feature branch (optional but recommended)
git checkout -b feature/add‑missing‑translations

# 5.3 Edit files in Antigravity IDE, following the patterns in how‑to‑navigate.md

# 5.4 Run the app to verify no errors
npm start

# 5.5 Commit your changes (small, focused commits)
git add .
git commit -m "feat: add missing translation keys (EN & FR)"

# 5.6 Push the feature branch and open a PR against dev
git push origin feature/add‑missing‑translations
# Then create a Pull Request in your Git host (GitHub/Bitbucket) targeting the dev branch.
```

---

## 6️⃣ Review & merge
- The team lead reviews the PR, ensures the CI passes, and merges into `dev`.
- When **all** tasks in `production‑readiness.md` are completed and the branch is stable, a final PR from `dev` → `main` is opened for the production release.

---

## 7️⃣ Quick cheat‑sheet (copy‑paste)
```bash
# Clone (once)
git clone https://github.com/your-org/opaycam.git && cd opaycam

# Switch to dev (every session)
git checkout dev && git pull origin dev

# Optional feature branch
git checkout -b my‑feature

# After work
git add .
git commit -m "type: short description"
git push origin my‑feature   # then open PR

# Keep dev up‑to‑date
git checkout dev && git pull origin dev
```

---

**Remember:**
- **Never push directly to `main`.**
- **Always use Antigravity IDE.**
- **Commit often, test before pushing, and open PRs against `dev`.**

Happy coding! 🚀
