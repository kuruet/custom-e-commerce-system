/**
 * Notification Service
 * Currently logs to console — replace internals with email/push/SMS later
 * without changing callers.
 */
export const sendNotification = (userId, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[NOTIFICATION] [${timestamp}] userId=${userId} → ${message}`);
  // TODO Phase 4: send real email / push notification
};
