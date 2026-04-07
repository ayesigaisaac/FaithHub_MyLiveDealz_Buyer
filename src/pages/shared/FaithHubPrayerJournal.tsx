import React, { useEffect, useMemo, useState } from "react";
import { BookOpenText, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createPrayerJournalEntry,
  deletePrayerJournalEntry,
  getPrayerJournalEntries,
  updatePrayerJournalEntry,
} from "@/data/repositories/prayerJournalRepository";
import type { PrayerJournalEntry } from "@/types/prayer";

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function FaithHubPrayerJournal() {
  const { user } = useAuth();
  const ownerId = useMemo(() => user?.email || user?.name || "guest", [user?.email, user?.name]);
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<PrayerJournalEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState("");

  useEffect(() => {
    let mounted = true;
    getPrayerJournalEntries(ownerId).then((rows) => {
      if (!mounted) return;
      setEntries(rows);
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [ownerId]);

  const handleAddEntry = async () => {
    const content = draft.trim();
    if (!content) return;
    const created = await createPrayerJournalEntry(ownerId, content);
    setEntries((previous) => [created, ...previous]);
    setDraft("");
  };

  const handleStartEdit = (entry: PrayerJournalEntry) => {
    setEditingId(entry.id);
    setEditingDraft(entry.content);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const content = editingDraft.trim();
    if (!content) return;
    const updated = await updatePrayerJournalEntry(ownerId, editingId, content);
    if (updated) {
      setEntries((previous) => previous.map((entry) => (entry.id === editingId ? updated : entry)));
    }
    setEditingId(null);
    setEditingDraft("");
  };

  const handleDelete = async (entryId: string) => {
    setEntries((previous) => previous.filter((entry) => entry.id !== entryId));
    const persisted = await deletePrayerJournalEntry(ownerId, entryId);
    setEntries(persisted);
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-5 sm:p-6">
          <div className="fh-label text-[var(--text-muted)]">Community</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Prayer Journal</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Private reflections for your personal prayer walk. Only your account can see these entries.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="fh-pill fh-pill-emerald">{entries.length} entries</Badge>
            <Badge className="fh-pill fh-pill-slate">Private</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="space-y-2 p-4 sm:p-5">
          <div className="text-sm font-semibold text-[var(--text-primary)]">New Entry</div>
          <textarea
            rows={4}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write your prayer thoughts..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
          />
          <div className="flex justify-end">
            <Button type="button" className="fh-user-primary-btn" onClick={handleAddEntry}>
              <Plus className="h-4 w-4" />
              Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-6 text-center text-sm text-[var(--text-secondary)]">Loading journal...</CardContent>
        </Card>
      ) : entries.length ? (
        <div className="grid gap-3">
          {entries.map((entry) => (
            <Card key={entry.id} className="fh-surface-card rounded-2xl">
              <CardContent className="space-y-3 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)]">
                    <BookOpenText className="h-4 w-4 text-[var(--accent)]" />
                    Journal Entry
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">{formatDate(entry.createdAt)}</div>
                </div>

                {editingId === entry.id ? (
                  <textarea
                    rows={4}
                    value={editingDraft}
                    onChange={(event) => setEditingDraft(event.target.value)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
                  />
                ) : (
                  <p className="text-sm leading-relaxed text-[var(--text-primary)]">{entry.content}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {editingId === entry.id ? (
                    <>
                      <Button type="button" uiSize="sm" className="h-8 px-2 text-xs" onClick={handleSaveEdit}>
                        <Save className="h-3.5 w-3.5" />
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        uiSize="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          setEditingId(null);
                          setEditingDraft("");
                        }}
                      >
                        <X className="h-3.5 w-3.5" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      uiSize="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => handleStartEdit(entry)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    uiSize="sm"
                    className="h-8 px-2 text-xs text-[#f77f00]"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-6 text-center text-sm text-[var(--text-secondary)]">
            No entries yet. Start by adding your first private prayer note.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
