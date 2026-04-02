import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CreateNoticeInput, NoticeType } from "@/data/notice.repository";

export type NoticeFormValues = Pick<CreateNoticeInput, "title" | "message" | "type" | "isPinned" | "expiresAt">;

type NoticeFormProps = {
  open: boolean;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (values: NoticeFormValues) => void;
};

const initialValues: NoticeFormValues = {
  title: "",
  message: "",
  type: "announcement",
  isPinned: false,
  expiresAt: "",
};

function optionLabel(type: NoticeType) {
  if (type === "urgent") return "Urgent";
  if (type === "event") return "Event";
  return "Announcement";
}

export default function NoticeForm({ open, submitting = false, onClose, onSubmit }: NoticeFormProps) {
  const [values, setValues] = useState<NoticeFormValues>(initialValues);

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = values.title.trim();
    const message = values.message.trim();
    if (!title || !message) return;

    onSubmit({
      ...values,
      title,
      message,
      expiresAt: values.expiresAt?.trim() || undefined,
    });
    setValues(initialValues);
  };

  const handleClose = () => {
    setValues(initialValues);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
      <Card className="fh-surface-card w-full max-w-xl rounded-2xl">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Create Notice</div>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Publish noticeboard update</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Share announcements, events, or urgent alerts with the community.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]"
              aria-label="Close create notice form"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <label className="fh-user-filter">
              Title
              <input
                value={values.title}
                onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Notice title"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                required
              />
            </label>

            <label className="fh-user-filter">
              Message
              <textarea
                value={values.message}
                onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Write the notice details..."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                rows={5}
                required
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="fh-user-filter">
                Notice type
                <select
                  value={values.type}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      type: event.target.value as NoticeType,
                    }))
                  }
                  className="w-full"
                >
                  {(["announcement", "event", "urgent"] as NoticeType[]).map((entry) => (
                    <option key={entry} value={entry}>
                      {optionLabel(entry)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="fh-user-filter">
                Expires at (optional)
                <input
                  type="datetime-local"
                  value={values.expiresAt || ""}
                  onChange={(event) => setValues((prev) => ({ ...prev, expiresAt: event.target.value }))}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={Boolean(values.isPinned)}
                onChange={(event) => setValues((prev) => ({ ...prev, isPinned: event.target.checked }))}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              Pin this notice to top
            </label>

            <div className="flex flex-wrap justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="fh-user-primary-btn" disabled={submitting}>
                {submitting ? "Publishing..." : "Publish notice"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
