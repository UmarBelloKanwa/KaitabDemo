export const RESERVED_SLUGS = [
    "auth", "public", "admin", "api", "log-in", "sign-up",
    "reset-password", "publish", "profile", "settings",
    "dashboard", "user-info", "user-topics", '/', '/about', '/contact-us', '/privacy-policy',
    '/terms-of-service',
];

export enum NotificationAction {
  MARK_READ = "mark_read",
  MARK_ALL_AS_READ = "mark_all_as_read",
  DELETE = "delete",
  DELETE_ALL = "delete_all_notifications",
}