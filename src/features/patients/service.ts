//servicio de pacientes
import { getPatients, getPatientsPaginated, createPatient, updatePatient, deletePatient, Patient } from '@/api/patients';

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const patients = await getPatients();
    return patients;
  } catch (error) {
    throw error;
  }
};


export const fetchPatientsPaginated = async (page: number, limit: number): Promise<{ patients: Patient[]; total: number }> => {
  try {
    const data = await getPatientsPaginated(page, limit);
    return data;
  } catch (error) {
    throw error;
  }
};


export const addPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  try {
    const newPatient = await createPatient(patient);
    return newPatient;
  } catch (error) {
    throw error;
  }
};

export const editPatient = async (id: string, patient: Partial<Omit<Patient, 'id'>>): Promise<Patient> => {
  try {
    const updatedPatient = await updatePatient(id, patient);
    return updatedPatient;
    } catch (error) {
    throw error;
  }
};

export const removePatient = async (id: string): Promise<void> => {
  try {
    await deletePatient(id);
  } catch (error) {
    throw error;
  }
};