// Servicio de citas

import { getAppointments, getAppointmentsPaginated, createAppointment, updateAppointment, deleteAppointment, Appointment, CreateAppointmentPayload, UpdateAppointmentPayload } from '@/api/appointments';

export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const appointments = await getAppointments();
    return appointments;
  } catch (error) {
    throw error;
  }
};

export const fetchAppointmentsPaginated = async (page: number, limit: number): Promise<{ appointments: Appointment[]; total: number }> => {
  try {
    const data = await getAppointmentsPaginated(page, limit);
    return data;
  } catch (error) {
    throw error;
  }
};

export const addAppointment = async (appointment: CreateAppointmentPayload): Promise<Appointment> => {
  try {
    // console.log('Creating appointment with payload:', JSON.stringify(appointment, null, 2));
    const newAppointment = await createAppointment(appointment);
    return newAppointment;
  } catch (error: any) {
    // console.log('Error creating appointment:', error?.response?.data || error.message);
    throw error;
  }
};

export const editAppointment = async (appointment: UpdateAppointmentPayload): Promise<Appointment> => {
  try {
    // console.log('Updating appointment with payload:', JSON.stringify(appointment, null, 2));
    const updatedAppointment = await updateAppointment(appointment);
    return updatedAppointment;
  } catch (error: any) {
    // console.log('Error updating appointment:', error?.response?.data || error.message);
    throw error;
  }
};

export const removeAppointment = async (id: string): Promise<void> => {
  try {
    await deleteAppointment(id);
  } catch (error) {
    throw error;
  }
};