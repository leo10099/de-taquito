// Typings
import { RootState } from "store";

export const selectNotificationStatus = (state: RootState): boolean => state.notification.isOpen;
export const selectNotificationType = (state: RootState): string => state.notification.alertType;
export const selectNotificationText = (state: RootState): string => state.notification.alertText;
