import type { Appointment } from '@/api/appointments';

export type AppointmentCardProps = {
  appointment: Appointment;
  onPress?: () => void;
  isLast?: boolean;
};
