import type { ColumnType } from 'kysely';
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role, EventType, ServiceType, BookingStatus } from './enums';

export type Booking = {
  id: Generated<string>;
  eventId: string;
  userId: string;
  venueId: string | null;
  vendorId: string | null;
  date: Timestamp;
  status: BookingStatus;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type Event = {
  id: Generated<string>;
  title: string;
  description: string | null;
  location: string | null;
  date: Timestamp | null;
  type: EventType;
  userId: string;
  aiAssisted: Generated<boolean>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type EventToVendor = {
  A: string;
  B: string;
};
export type Inquiry = {
  id: Generated<string>;
  message: string;
  venueId: string;
  userId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type Otp = {
  id: Generated<string>;
  token: number;
  email: string;
  exp: Timestamp;
};
export type Review = {
  id: Generated<string>;
  rating: number;
  comment: string | null;
  vendorId: string;
  userId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type User = {
  id: Generated<string>;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  avatar_url: string | null;
  role: Role;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type Vendor = {
  id: Generated<string>;
  name: string;
  serviceType: ServiceType;
  pricing: number;
  availability: Generated<boolean>;
  description: string;
  portfolio: string[];
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type Venue = {
  id: Generated<string>;
  name: string;
  location: string;
  capacity: number;
  amenities: string[];
  pricing: number;
  availability: Generated<boolean>;
  ownerId: string;
  images: string[];
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type DB = {
  _EventToVendor: EventToVendor;
  Booking: Booking;
  Event: Event;
  Inquiry: Inquiry;
  Otp: Otp;
  Review: Review;
  User: User;
  Vendor: Vendor;
  Venue: Venue;
};
