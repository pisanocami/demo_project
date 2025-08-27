# Frontend Components List (Lovable)

This catalog lists UI components to be built in Lovable (https://lovable.so) and then imported into the React Vite codebase under `frontend/src/components`.

| Key | Component | Description | Lovable Block | Props / Notes |
|-----|-----------|-------------|---------------|--------------|
| C1 | **AppShell** | Overall layout wrapper with header, sidebar, main panel | Layout → Sidebar Layout | `navItems`, `user`, `onLogout` |
| C2 | **HeaderBar** | Top navigation bar showing project title, user avatar, and notifications | Navigation → Top Bar | `title`, `avatarUrl`, `onToggleSidebar` |
| C3 | **ProjectList** | Scrollable list of all projects with status badges | Lists → Table List | `projects[]` |
| C4 | **ProjectCard** | Card view for project summary (progress, members) | Cards → Portfolio Card | `project`, `onOpen` |
| C5 | **KanbanBoard** | Drag-and-drop task board (columns, cards) | Boards → Kanban Board | `columns[]`, `onTaskMove` |
| C6 | **TaskCard** | Task item with title, assignees, due date | Cards → Task Card | `task`, `onEdit`, `onDelete` |
| C7 | **TaskModal** | Modal dialog for creating/editing tasks | Modals → Form Modal | `task?`, `onSave` |
| C8 | **MemberAvatarGroup** | Clustered user avatars | Avatars → Grouped Avatars | `members[]` |
| C9 | **ProgressBar** | Visual progress indicator for project completion | Indicators → Progress Bar | `percent` |
| C10 | **LoginForm** | Basic email/password sign-in | Forms → Login Form | `onSubmit` |
| C11 | **RegisterForm** | Sign-up form | Forms → Register Form | `onSubmit` |
| C12 | **NotificationToast** | Toast message for success/error/info | Feedback → Toast | `type`, `message` |
| C13 | **SettingsPanel** | Account settings with tabs | Panels → Settings Tabs | `user`, `onUpdate` |
| C14 | **Breadcrumbs** | Breadcrumb navigation for nested pages | Navigation → Breadcrumbs | `items[]` |
| C15 | **EmptyState** | Friendly placeholder when list is empty | States → Empty State | `title`, `description`, `actionLabel`, `onAction` |

All props are typed with TypeScript interfaces inside each component file. Use Lovable to export each component as clean JSX with Tailwind CSS classes disabled (prefer CSS Modules).