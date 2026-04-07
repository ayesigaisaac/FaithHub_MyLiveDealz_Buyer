import React, { useState } from "react";
import type { CreatePrayerRequestInput, PrayerCategory, PrayerUrgency } from "@/types/prayer";
import { Button } from "@/components/ui/button";

type PrayerFormValues = {
  title: string;
  description: string;
  category: PrayerCategory;
  isAnonymous: boolean;
  urgency: PrayerUrgency;
};

const initialValues: PrayerFormValues = {
  title: "",
  description: "",
  category: "spiritual",
  isAnonymous: false,
  urgency: "normal",
};

interface PrayerFormProps {
  createdBy: string;
  onCancel?: () => void;
  onSubmit: (input: CreatePrayerRequestInput) => Promise<void> | void;
}

export default function PrayerForm({ createdBy, onCancel, onSubmit }: PrayerFormProps) {
  const [values, setValues] = useState<PrayerFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = <K extends keyof PrayerFormValues>(key: K, value: PrayerFormValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.title.trim() || !values.description.trim()) return;
    setIsSubmitting(true);
    await onSubmit({
      title: values.title,
      description: values.description,
      category: values.category,
      isAnonymous: values.isAnonymous,
      urgency: values.urgency,
      createdBy,
    });
    setValues(initialValues);
    setIsSubmitting(false);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Title</span>
          <input
            value={values.title}
            onChange={(event) => setValue("title", event.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
            placeholder="What should we pray for?"
            required
          />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Category</span>
          <select
            value={values.category}
            onChange={(event) => setValue("category", event.target.value as PrayerCategory)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
          >
            <option value="healing">Healing</option>
            <option value="family">Family</option>
            <option value="finance">Finance</option>
            <option value="spiritual">Spiritual</option>
          </select>
        </label>
      </div>

      <label className="space-y-1.5 text-sm">
        <span className="font-medium text-[var(--text-primary)]">Description</span>
        <textarea
          value={values.description}
          onChange={(event) => setValue("description", event.target.value)}
          rows={3}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
          placeholder="Share details so the community can pray specifically."
          required
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Urgency</span>
          <select
            value={values.urgency}
            onChange={(event) => setValue("urgency", event.target.value as PrayerUrgency)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-secondary)]">
          <input
            type="checkbox"
            checked={values.isAnonymous}
            onChange={(event) => setValue("isAnonymous", event.target.checked)}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          Post as anonymous
        </label>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Post Prayer Request"}
        </Button>
      </div>
    </form>
  );
}
