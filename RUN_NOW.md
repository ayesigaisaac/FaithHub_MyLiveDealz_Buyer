# Run FaithHub Now

## Option 1: Run the development server

```bash
npm install
npm run dev
```

## Option 2: Preview the production build already included

The `dist/` folder is already generated.

```bash
npm install
npm run preview
```

## Key routes

- `/` → Public FaithHub website landing page
- `/shell-preview` → Attached multi-role shell preview page
- `/app/user/home` → User app shell entry
- `/app/provider/dashboard` → Provider app shell entry
- `/app/admin/overview` → Admin app shell entry

## Notes

- Built with Vite + React + TypeScript + MUI + Tailwind.
- EVzone primary green is embedded as `#03cd8c`.
- The project uses only the attached FaithHub page set as its application screens.
