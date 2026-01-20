export type Appointment = {
  date: string;
  reason: string;
  status: string;
  doctor?: string;
};

export type AppointmentCardProps = {
  appointment: Appointment;
  isLast?: boolean;
};
