export type NoticeType = "announcement" | "event" | "urgent";

export interface Notice {
  id: string;
  title: string;
  message: string;
  type: NoticeType;
  author: string;
  createdAt: string;
  expiresAt?: string;
  isPinned: boolean;
}

export interface NoticeRepository {
  getNotices(): Promise<Notice[]>;
  saveNotices(notices: Notice[]): Promise<Notice[]>;
}

