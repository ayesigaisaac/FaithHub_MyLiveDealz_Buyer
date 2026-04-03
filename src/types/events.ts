export type CalendarView = "day" | "week" | "month";

export interface EventAgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  eventType?: "service" | "conference" | "community" | "urgent";
  agenda?: EventAgendaItem[];
}

