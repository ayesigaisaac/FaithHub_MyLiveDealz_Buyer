import { repositoryFactory } from "@/data/repositories/factory";
import {
  readCounselingBookingsSync,
  writeCounselingBookingsSync,
} from "@/data/repositories/counselingRepository";
import { simulateLatency } from "@/data/services/runtime";
import type { Booking } from "@/types/counseling";

function sortBookings(bookings: Booking[]) {
  return bookings.slice().sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

export function getStoredBookingsSync() {
  return sortBookings(readCounselingBookingsSync());
}

export function saveStoredBookingsSync(bookings: Booking[]) {
  writeCounselingBookingsSync(bookings);
  return getStoredBookingsSync();
}

export async function getStoredBookings() {
  await simulateLatency();
  const bookings = await repositoryFactory.counseling.getBookings();
  return sortBookings(bookings);
}

export async function saveStoredBookings(bookings: Booking[]) {
  await simulateLatency();
  const next = await repositoryFactory.counseling.saveBookings(bookings);
  return sortBookings(next);
}

