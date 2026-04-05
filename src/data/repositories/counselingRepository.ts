import { readJsonVersioned, writeJsonVersioned } from "@/data/adapters/storage";
import type { CounselingRepository } from "@/data/interfaces/counseling-repository";
import type { Booking } from "@/types/counseling";

const STORAGE_KEY = "faithhub.counseling.bookings";
const SCHEMA_VERSION = 1;

function isBooking(candidate: unknown): candidate is Booking {
  if (!candidate || typeof candidate !== "object") return false;
  const booking = candidate as Booking;
  return Boolean(booking.id && booking.counselorId && booking.startsAt && booking.endsAt);
}

function reviveBookings(value: unknown): Booking[] | null {
  if (!Array.isArray(value)) return [];
  return value.filter(isBooking);
}

export function readCounselingBookingsSync() {
  return readJsonVersioned(STORAGE_KEY, [] as Booking[], {
    currentVersion: SCHEMA_VERSION,
    reviveData: reviveBookings,
    migrate: (legacyData) => reviveBookings(legacyData),
  });
}

export function writeCounselingBookingsSync(bookings: Booking[]) {
  writeJsonVersioned(STORAGE_KEY, bookings, SCHEMA_VERSION);
}

class MockCounselingRepository implements CounselingRepository {
  async getBookings() {
    return readCounselingBookingsSync();
  }

  async saveBookings(bookings: Booking[]) {
    writeCounselingBookingsSync(bookings);
    return readCounselingBookingsSync();
  }
}

export const counselingRepository: CounselingRepository = new MockCounselingRepository();
