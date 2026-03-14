import AppRouter from "@/app/AppRouter";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--bg)] text-[var(--text-primary)]">
      <AppRouter />
    </div>
  );
}