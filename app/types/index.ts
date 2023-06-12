import { Listing, Post, Reservation, User } from '@prisma/client';

export type SafeListing = Omit<
  Listing,
  "createdAt" | "locationValue"
> & {
  createdAt: string;
  locationValue: string | null;
}

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword" 
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}

export type SafePostUser = Omit<
  Post,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
  user: SafeUser
}