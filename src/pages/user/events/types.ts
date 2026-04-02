export type EventItem = {
  id: number;
  title: string;
  type: string;
  audience: string;
  venue: string;
  area: string;
  start: string;
  end: string;
  time: string;
  institution: string;
  memberOnly: boolean;
  ticketed: boolean;
  rsvp: "Going" | "Interested" | "Not yet";
  spotlight: string;
};

export type CalendarDay = {
  day: string;
  label: string;
};

export type EventAgendaItem = {
  time: string;
  title: string;
  description?: string;
};

export type CalendarEventModel = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  agenda?: EventAgendaItem[];
};
