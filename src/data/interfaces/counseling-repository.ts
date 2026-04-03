import type { Booking } from "@/types/counseling";

export interface CounselingRepository {
  getBookings(): Promise<Booking[]>;
  saveBookings(bookings: Booking[]): Promise<Booking[]>;
}

