// API de empleados (employees)
import api from './axiosInstance';

export interface Employee {
  id: number;
  nombreCompleto: string;
}

export interface CreateEmployeePayload {
  nombreCompleto: string;
}

export interface UpdateEmployeePayload {
  id: number;
  nombreCompleto: string;
}

// Obtener la lista de empleados
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get<Employee[]>('api/empleados');
  return response.data;
};

// Crear un nuevo empleado
export const createEmployee = async (employee: CreateEmployeePayload): Promise<Employee> => {
  const response = await api.post<Employee>('api/empleados', employee);
  return response.data;
};

// Actualizar un empleado existente
export const updateEmployee = async (employee: UpdateEmployeePayload): Promise<Employee> => {
  const response = await api.put<Employee>('api/empleados', employee);
  return response.data;
};

// Eliminar un empleado
export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`api/empleados/${id}`);
};