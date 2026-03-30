import React, { useEffect, useState } from "react";
import { ArrowLeft, Download, ExternalLink, FileText, Headphones, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  bumpResourceDownload,
  faithMartUrl,
  getFaithHubResources,
  saveFaithHubResources,
} from "@/data/resources";
import { routes } from "@/constants/routes";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mediaActionLabel(type: "pdf" | "audio" | "video") {
  if (type === "audio") return "Listen now";
  if (type === "video") return "Watch now";
  return "Read now";
}

function mediaIcon(type: "pdf" | "audio" | "video") {
  if (type === "audio") return <Headphones className="h-4 w-4" />;
  if (type === "video") return <PlayCircle className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

export default function FaithHubResourceDetail() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { resourceId = "" } = useParams<{ resourceId: string }>();
  const viewerRole = role === "provider" ? "provider" : "user";

  const [resources, setResources] = useState(() => getFaithHubResources());
  const resource = resources.find((entry) => entry.id === resourceId) || null;

  useEffect(() => {
    saveFaithHubResources(resources);
  }, [resources]);

  const backPath = viewerRole === "provider" ? routes.app.provider.resources : routes.app.user.resources;

  if (!resource) {
    return (
      <div className="space-y-4">
        <Card className="fh-surface-card rounded-[28px]">
          <CardContent className="p-6">
            <div className="text-xl font-semibold text-[var(--text-primary)]">Resource not found</div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              This resource link is no longer available. Return to the resources library to continue.
            </p>
            <div className="mt-4">
              <Button className="fh-user-primary-btn" onClick={() => navigate(backPath)}>
                Back to resources
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const openResourceFile = () => {
    setResources((prev) => bumpResourceDownload(prev, resource.id));
    window.open(resource.file_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Resource Detail</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">{resource.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">{resource.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">Free</Badge>
                <Badge className="fh-pill fh-pill-slate">{resource.category}</Badge>
                <Badge className="fh-pill fh-pill-slate">{resource.type.toUpperCase()}</Badge>
              </div>
            </div>
            <Button variant="outline" className="fh-user-secondary-btn" onClick={() => navigate(backPath)}>
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to resources
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">About this resource</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="fh-label text-[var(--text-muted)]">Author</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{resource.author}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="fh-label text-[var(--text-muted)]">Published</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{formatDate(resource.created_at)}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="fh-label text-[var(--text-muted)]">Type</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{resource.type.toUpperCase()}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="fh-label text-[var(--text-muted)]">Downloads</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{resource.download_count}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={`${resource.id}-${tag}`} className="fh-pill fh-pill-slate">
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Actions</div>
            <div className="mt-3 space-y-2">
              <Button className="fh-user-primary-btn w-full" onClick={openResourceFile}>
                {mediaIcon(resource.type)}
                <span className="ml-1.5">{mediaActionLabel(resource.type)}</span>
              </Button>
              <Button variant="outline" className="fh-user-secondary-btn w-full" onClick={openResourceFile}>
                <Download className="mr-1.5 h-4 w-4" />
                Download resource
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn w-full"
                onClick={() => window.open(faithMartUrl, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Explore premium resources in FaithMart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
