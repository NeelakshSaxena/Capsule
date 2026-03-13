
# Phase 0 — Design System Foundation



## What to build

* Color palette
* Typography
* Card component
* Button component
* Chart style
* Icon system
* Grid layout

### Components

* `Card`
* `MetricCard`
* `WidgetContainer`
* `Navbar`
* `Sidebar (optional)`
* `IconButton`
* `ProgressBar`
* `ChartWrapper`

### Deliverables

```plaintext
/ui
  Button.tsx
  Card.tsx
  Widget.tsx
  Chart.tsx
  Navbar.tsx
  IconButton.tsx
/theme
  colors.ts
  typography.ts
  shadows.ts
```

### Verification

Check visually:

✔ colors consistent
✔ rounded corners identical
✔ shadows consistent
✔ spacing consistent
✔ hover effects work
✔ responsive grid works

If this phase fails → everything later becomes messy.

---

# Phase 1 — Global Layout

Build the **main app shell**.

This is the frame that all pages sit inside.

### Layout Structure

```plaintext
Navbar
Main Container
Page Content
```

### Navbar Elements

From your screenshot:

Left:

* Logo capsule
* product name

Center:

* navigation tabs

Right:

* settings icon
* notifications
* user avatar

### Deliverables

```plaintext
/layout
  MainLayout.tsx
  Navbar.tsx
  PageContainer.tsx
```

### Verification

✔ Navbar always visible
✔ active tab highlight works
✔ responsive behavior works
✔ icons clickable
✔ profile menu opens

If this fails → navigation becomes confusing.

---

# Phase 2 — Dashboard Overview Page

This is the **main page** like the screenshot.

### Layout Structure

```plaintext
Header
Metrics Row
Widget Grid
```

### Components

Header section:

```
Welcome back
system overview text
```

Metrics cards:

```
Agents Running
Modules Installed
Active Models
Tasks Today
```

Widget grid:

```
Profile Widget
Progress Widget
Time Tracker
Task Progress
Calendar Timeline
Activity Feed
Devices Panel
Resources Panel
```

### Deliverables

```plaintext
/pages/dashboard

DashboardPage.tsx

/widgets
  ProfileWidget.tsx
  ProgressWidget.tsx
  TimeTrackerWidget.tsx
  TaskProgressWidget.tsx
  TimelineWidget.tsx
  ActivityFeedWidget.tsx
  DevicesWidget.tsx
  ResourcesWidget.tsx
```

### Verification

Layout checks:

✔ widgets align properly
✔ spacing between cards consistent
✔ charts render correctly
✔ large numbers readable
✔ no overflow issues

Interaction checks:

✔ hover effects work
✔ widgets resize correctly
✔ responsive grid works

---

# Phase 3 — Agents Page

Purpose: manage AI agents.

### Layout

Top section:

```
Agent Status Summary
```

Main section:

```
Agent cards grid
```

### Agent Card

Each card shows:

```
agent name
model used
tools attached
status
start/stop button
settings button
```

### Agent Detail Page

Clicking agent opens:

```
Agent prompt
Tools allowed
Memory access
Logs
Test console
```

### Deliverables

```plaintext
/pages/agents

AgentsPage.tsx
AgentDetailPage.tsx

/components/agent
AgentCard.tsx
AgentSettings.tsx
AgentLogs.tsx
```

### Verification

✔ agent list loads
✔ status indicators update
✔ start/stop works
✔ tools appear correctly
✔ logs load

---

# Phase 4 — Modules Page

This page manages your **apps/plugins**.

### Layout

```
Installed Modules Grid
+ Add Module Button
```

Module card shows:

```
icon
name
version
enabled/disabled
settings
permissions
```

### Add Module Flow

Upload:

```
zip
git repo
folder
```

System installs module.

### Deliverables

```plaintext
/pages/modules

ModulesPage.tsx
ModuleDetailPage.tsx

/components/module
ModuleCard.tsx
ModuleInstaller.tsx
```

### Verification

✔ modules auto-load
✔ enable/disable works
✔ settings page loads
✔ module removal works

---

# Phase 5 — Tools Page

Shows tools agents can use.

### Layout

Tool registry table.

Columns:

```
Tool Name
Type
Used By
Status
Enable
Disable
```

### Deliverables

```plaintext
/pages/tools

ToolsPage.tsx
ToolDetailPage.tsx
```

### Verification

✔ tool list loads
✔ agents referencing tools show correctly
✔ enable/disable works

---

# Phase 6 — Memory Page

This is the **AI memory inspector**.

### Sections

Memory overview

```
vector db size
memory count
memory types
```

Memory list:

```
recent memories
structured memories
conversation summaries
```

Search:

```
semantic search bar
```

### Deliverables

```plaintext
/pages/memory

MemoryPage.tsx
MemorySearch.tsx
MemoryList.tsx
MemoryInspector.tsx
```

### Verification

✔ search returns results
✔ memory categories visible
✔ memory deletion works

---

# Phase 7 — Models Page

Shows all local models.

### Layout

Model cards:

```
model name
VRAM usage
status
start/stop
settings
```

### Model settings

```
temperature
context window
max tokens
```

### Deliverables

```plaintext
/pages/models

ModelsPage.tsx
ModelCard.tsx
ModelSettings.tsx
```

### Verification

✔ models detected automatically
✔ running state correct
✔ settings apply correctly

---

# Phase 8 — Users Page

User management.

### Layout

Table:

```
Name
Role
Access
Last active
Edit
```

### Deliverables

```plaintext
/pages/users

UsersPage.tsx
UserEditor.tsx
```

### Verification

✔ user creation works
✔ role editing works
✔ permissions apply

---

# Phase 9 — Permissions Page

Permission matrix.

Example:

```
         Chat  Health  Memory
Admin      ✔      ✔      ✔
Father     ✖      ✔      ✖
Friend     ✔      ✖      ✖
```

### Deliverables

```plaintext
/pages/permissions

PermissionsPage.tsx
PermissionMatrix.tsx
```

### Verification

✔ toggles update permissions
✔ modules respect permissions

---

# Phase 10 — Logs Page

System debugging.

Logs include:

```
agent events
memory extraction
tool execution
errors
```

### Deliverables

```plaintext
/pages/logs

LogsPage.tsx
LogViewer.tsx
```

### Verification

✔ logs update live
✔ filtering works

---

# Phase 11 — Settings Page

Global system settings.

Sections:

```
LLM Settings
System Settings
Security
Integrations
Updates
```

### Deliverables

```plaintext
/pages/settings

SettingsPage.tsx
LLMSettings.tsx
SystemSettings.tsx
```

### Verification

✔ settings persist
✔ changes affect system

---

# Final Phase — Integration Testing

Before deploying.

### Tests

System flow test:

```
Install module
Agent uses module
Memory extracted
Log recorded
Dashboard updated
```

User permission test:

```
Father logs in
Health accessible
Memory hidden
```

Performance test:

```
10 agents running
dashboard responsive
```

---

# Final Product Structure

```plaintext
AI Command Center
│
├ Dashboard
├ Agents
├ Modules
├ Tools
├ Memory
├ Models
├ Users
├ Permissions
├ Logs
└ Settings
```

