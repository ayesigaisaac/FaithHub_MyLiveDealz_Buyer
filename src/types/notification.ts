export type FaithHubNotificationType = "prayed" | "comment" | "answered";

export interface FaithHubNotification {
  id: string;
  type: FaithHubNotificationType;
  message: string;
  read: boolean;
  createdAt: string;
}
