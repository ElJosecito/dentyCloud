// API de pacientes (patients)
import api from './axiosInstance';

export interface Patient {
  id: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: string;
}


// Obtener la lista de pacientes
export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get<Patient[]>('api/pacientes');
  return response.data;
};

//fetch patients paginated
export const getPatientsPaginated = async (page: number, limit: number): Promise<{ patients: Patient[]; total: number }> => {
  const response = await api.get<{ patients: Patient[]; total: number }>(`api/pacientes?page=${page}&limit=${limit}`);
  return response.data;
};

// Crear un nuevo paciente
export const createPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  const response = await api.post<Patient>('api/pacientes', patient);
  return response.data;
};

// Actualizar un paciente existente
export const updatePatient = async (id: string, patient: Partial<Omit<Patient, 'id'>>): Promise<Patient> => {
  const response = await api.put<Patient>('api/pacientes', { id, ...patient });
  return response.data;
};

// Eliminar un paciente
export const deletePatient = async (id: string): Promise<void> => {
  await api.delete(`api/pacientes/${id}`);
};