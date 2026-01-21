// API de citas (appointments)
import api from './axiosInstance';

export interface Appointment {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  estadoCita: number;
  estado: string;
  paciente: {
    id: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    sexo: string;
  };
  empleadoAtiende: {
    id: number;
    nombreCompleto: string;
  };
}

export interface CreateAppointmentPayload {
  fechaInicio: string;
  fechaFin: string;
  estadoCita: number;
  pacienteId: number;
  empleadoId: number;
}

export interface UpdateAppointmentPayload extends CreateAppointmentPayload {
  id: number;
}

// Obtener la lista de citas
export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get<Appointment[]>('api/citas');
  return response.data;
};

// Obtener citas paginadas
export const getAppointmentsPaginated = async (page: number, limit: number): Promise<{ appointments: Appointment[]; total: number }> => {
  const response = await api.get<{ appointments: Appointment[]; total: number }>(`api/citas?page=${page}&limit=${limit}`);
  return response.data;
};

// Crear una nueva cita
export const createAppointment = async (appointment: CreateAppointmentPayload): Promise<Appointment> => {
  const response = await api.post<Appointment>('api/citas', appointment);
  return response.data;
};

// Actualizar una cita existente
export const updateAppointment = async (appointment: UpdateAppointmentPayload): Promise<Appointment> => {
  // Enviar en el orden que espera la API
  const payload = {
    id: appointment.id,
    pacienteId: appointment.pacienteId,
    empleadoId: appointment.empleadoId,
    fechaInicio: appointment.fechaInicio,
    fechaFin: appointment.fechaFin,
    estadoCita: appointment.estadoCita,
  };
  const response = await api.put<Appointment>('api/citas', payload);
  return response.data;
};

// Eliminar una cita
export const deleteAppointment = async (id: string): Promise<void> => {
  await api.delete(`api/citas/${id}`);
};