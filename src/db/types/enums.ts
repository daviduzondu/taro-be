export const Role = {
    USER: "USER",
    ADMIN: "ADMIN",
    VENDOR: "VENDOR"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export const EventType = {
    CONFERENCE: "CONFERENCE",
    WEDDING: "WEDDING",
    PARTY: "PARTY",
    CORPORATE_EVENT: "CORPORATE_EVENT"
} as const;
export type EventType = (typeof EventType)[keyof typeof EventType];
export const ServiceType = {
    DJ: "DJ",
    CATERER: "CATERER",
    PHOTOGRAPHER: "PHOTOGRAPHER",
    DECORATOR: "DECORATOR"
} as const;
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];
export const BookingStatus = {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    CANCELLED: "CANCELLED"
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
