import React from "react";
import { Button } from "@/components/ui/button";

interface State { hasError: boolean; error?: Error; }
export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error("FaithHub render error", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] px-4">
          <div className="max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-2xl font-semibold text-slate-900">Something went wrong</div>
            <div className="mt-3 fh-body text-slate-600">The app hit an unexpected rendering issue. Reload the page to continue.</div>
            <div className="mt-6"><Button onClick={() => window.location.reload()}>Reload app</Button></div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


