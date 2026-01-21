//service
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, Employee, CreateEmployeePayload, UpdateEmployeePayload } from '@/api/employees';

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const employees = await getEmployees();
    return employees;
  } catch (error) {
    throw error;
  }
};

export const fetchEmployeeById = async (id: number): Promise<Employee | null> => {
  try {
    const employees = await fetchEmployees();
    const employee = employees.find(e => e.id === id);
    return employee || null;
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (employee: CreateEmployeePayload): Promise<Employee> => {
  try {
    const newEmployee = await createEmployee(employee);
    return newEmployee;
  } catch (error) {
    throw error;
  }
};

export const editEmployee = async (employee: UpdateEmployeePayload): Promise<Employee> => {
  try {
    const updatedEmployee = await updateEmployee(employee);
    return updatedEmployee;
  } catch (error) {
    throw error;
  }
};

export const removeEmployee = async (id: number): Promise<void> => {
  try {
    await deleteEmployee(id);
  } catch (error) {
    throw error;
  }
};
