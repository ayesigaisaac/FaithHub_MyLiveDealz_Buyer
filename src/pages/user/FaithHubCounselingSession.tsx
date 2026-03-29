import React, { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  ExternalLink,
  Link2,
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  SendHorizontal,
  ShieldCheck,
  Video,
  VideoOff,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildSessionRoomUrl,
  getCounselorById,
  getSessionById,
  updateBookingStatus,
} from "@/data/counseling";
import { routes } from "@/constants/routes";
import type { SessionType } from "@/types/counseling";

type ChatMessage = {
  id: string;
  author: "You" | "Counselor";
  message: string;
  at: string;
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function FaithHubCounselingSession() {
  const navigate = useNavigate();
  const { sessionId = "" } = useParams<{ sessionId: string }>();
  const [params] = useSearchParams();

  const session = getSessionById(sessionId);
  const counselor = getCounselorById(
    params.get("counselorId") || session?.counselorId || "",
  );
  const roomUrl = session?.roomUrl || buildSessionRoomUrl(sessionId || "demo-room");
  const roomId = session?.roomId || `FaithHubCounseling-${sessionId || "demo-room"}`;
  const fallbackMode = (params.get("mode") as SessionType) || "video";

  const [sessionMode, setSessionMode] = useState<SessionType>(session?.sessionType || fallbackMode);
  const [sessionEnded, setSessionEnded] = useState(session?.status === "ended");
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      author: "Counselor",
      message: "Welcome. We can begin when you're ready. Take a breath and share what you want to focus on today.",
      at: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    if (sessionEnded) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [sessionEnded]);

  const sessionLabel = useMemo(() => {
    if (sessionEnded) return "Ended";
    return "Live";
  }, [sessionEnded]);

  const handleCopyLink = async () => {
    try {
      if (!navigator?.clipboard?.writeText) {
        window.open(roomUrl, "_blank", "noopener,noreferrer");
        return;
      }
      await navigator.clipboard.writeText(roomUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 1800);
    } catch {
      window.open(roomUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleSendMessage = () => {
    const value = chatInput.trim();
    if (!value) return;
    const now = new Date().toISOString();
    setChatMessages((prev) => [
      ...prev,
      { id: `you-${Date.now()}`, author: "You", message: value, at: now },
      {
        id: `counselor-${Date.now() + 1}`,
        author: "Counselor",
        message: "Received. Thank you for sharing that context.",
        at: now,
      },
    ]);
    setChatInput("");
  };

  const endSession = () => {
    if (sessionId) {
      updateBookingStatus(sessionId, "completed");
    }
    setSessionEnded(true);
  };

  if (!sessionId || !session) {
    return (
      <div className="space-y-4">
        <Card className="fh-surface-card rounded-[28px]">
          <CardContent className="p-6">
            <div className="text-lg font-semibold text-[var(--text-primary)]">Session not found</div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              The counseling session link is invalid or expired. Start from discovery to book a new secure session.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button className="fh-user-primary-btn" onClick={() => navigate(routes.app.user.counseling)}>
                Go to counseling
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => navigate(routes.app.user.counselingHistory)}
              >
                Open session history
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label fh-user-kicker">Online Counseling Session</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Session with {session.counselorName}
              </h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {formatDateTime(session.startsAt)} - {session.sessionType.toUpperCase()} mode
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="fh-pill fh-pill-emerald">{sessionLabel}</span>
                <span className="fh-pill fh-pill-slate inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {formatDuration(elapsedSeconds)}
                </span>
                <span className="fh-pill fh-pill-slate inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  End-to-end trusted room
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => navigate(routes.app.user.counselingHistory)}
              >
                Session history
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => window.open(roomUrl, "_blank", "noopener,noreferrer")}
              >
                Open in new tab
              </Button>
              <Button className="fh-user-primary-btn" onClick={endSession}>
                End session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Card className="fh-surface-card rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="border-b border-[var(--border)] p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant={sessionMode === "video" ? "default" : "outline"}
                  className={sessionMode === "video" ? "fh-user-primary-btn" : "fh-user-secondary-btn"}
                  onClick={() => setSessionMode("video")}
                >
                  <Video className="mr-1.5 h-4 w-4" />
                  Video
                </Button>
                <Button
                  type="button"
                  variant={sessionMode === "chat" ? "default" : "outline"}
                  className={sessionMode === "chat" ? "fh-user-primary-btn" : "fh-user-secondary-btn"}
                  onClick={() => setSessionMode("chat")}
                >
                  <MessageSquare className="mr-1.5 h-4 w-4" />
                  Chat
                </Button>
              </div>
            </div>

            {sessionMode === "video" ? (
              <div className="space-y-0">
                <iframe
                  title="FaithHub counseling video room"
                  src={`${roomUrl}#config.prejoinPageEnabled=false`}
                  className="h-[56vh] w-full border-0"
                  allow="camera; microphone; fullscreen; display-capture; clipboard-write"
                />
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] p-3 sm:p-4">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMuted((prev) => !prev)}
                      className="inline-flex h-10 min-w-[100px] items-center justify-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--fh-elevated-surface)]"
                    >
                      {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      {muted ? "Unmute" : "Mute"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCameraOff((prev) => !prev)}
                      className="inline-flex h-10 min-w-[100px] items-center justify-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--fh-elevated-surface)]"
                    >
                      {cameraOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                      {cameraOff ? "Camera on" : "Camera off"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={endSession}
                    className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-[rgba(247,127,0,0.35)] bg-[rgba(247,127,0,0.12)] px-4 text-sm font-semibold text-[var(--warning)] transition hover:bg-[rgba(247,127,0,0.2)]"
                  >
                    <PhoneOff className="h-4 w-4" />
                    End now
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-[56vh] flex-col">
                <div className="fh-scroll-region flex-1 space-y-2 overflow-y-auto p-4">
                  {chatMessages.map((entry) => (
                    <div
                      key={entry.id}
                      className={`max-w-[85%] rounded-xl border px-3 py-2 text-sm ${
                        entry.author === "You"
                          ? "ml-auto border-[rgba(3,205,140,0.35)] bg-[var(--accent-soft)] text-[var(--text-primary)]"
                          : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                        {entry.author} - {new Date(entry.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                      <div className="mt-1">{entry.message}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--border)] p-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      placeholder="Type a confidential message..."
                      className="h-11 flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,205,140,0.34)]"
                    />
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition hover:bg-[var(--accent-strong)]"
                    >
                      <SendHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Session access</div>
            <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <div className="fh-label text-[var(--text-muted)]">Counselor</div>
                <div className="mt-1 font-semibold text-[var(--text-primary)]">
                  {counselor?.name || session.counselorName}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <div className="fh-label text-[var(--text-muted)]">Session ID</div>
                <div className="mt-1 inline-flex items-center gap-1 font-semibold text-[var(--text-primary)]">
                  <Link2 className="h-4 w-4 text-[var(--accent)]" />
                  {roomId}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <div className="fh-label text-[var(--text-muted)]">Join link</div>
                <div className="mt-1 truncate text-xs text-[var(--text-secondary)]">{roomUrl}</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button variant="outline" className="fh-user-secondary-btn w-full" onClick={handleCopyLink}>
                {copiedLink ? "Link copied" : "Copy join link"}
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn w-full"
                onClick={() => window.open(roomUrl, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Join via link
              </Button>
              <Button className="fh-user-primary-btn w-full" onClick={() => navigate(routes.app.user.counselingBook)}>
                Rebook session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
