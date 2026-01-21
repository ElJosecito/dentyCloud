import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyText from '@/shared/components/Text/MyText';
import MyInput from '@/shared/components/Input/MyInput';
import MyButton from '@/shared/components/Button/MyButton';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import { colors } from '@/shared/constants';
import { formattedDate, formatTime } from '@/shared/utils/utils';
import { addAppointment, editAppointment } from '../service';
import { fetchPatients } from '@/features/patients/service';
import { fetchEmployees } from '@/features/employees/service';
import type { Patient } from '@/api/patients';
import type { Employee } from '@/api/employees';

interface AppointmentData {
  id?: number;
  fechaInicio?: string;
  fechaFin?: string;
  estadoCita?: number;
  pacienteId?: number;
  pacienteNombres?: string;
  pacienteApellidos?: string;
  empleadoId?: number;
  empleadoNombre?: string;
}

interface CreateAppointmentProps {
  onSuccess?: () => void;
  initialData?: AppointmentData;
  isEditMode?: boolean;
}

const CreateAppointment: React.FC<CreateAppointmentProps> = ({ onSuccess, initialData, isEditMode = false }) => {
  const insets = useSafeAreaInsets();
  
  // Estados para pacientes y empleados
  const [patients, setPatients] = useState<Patient[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  
  // Estado de la cita
  const [estadoCita, setEstadoCita] = useState<number>(initialData?.estadoCita || 1);
  const estadosOptions = [
    { id: 1, label: 'Pendiente' },
    { id: 2, label: 'Confirmada' },
    { id: 3, label: 'Cancelada' },
    { id: 4, label: 'Completada' },
  ];
  
  // Estados para fechas
  const [fechaInicio, setFechaInicio] = useState(
    initialData?.fechaInicio ? new Date(initialData.fechaInicio) : new Date()
  );
  const [fechaFin, setFechaFin] = useState(
    initialData?.fechaFin ? new Date(initialData.fechaFin) : new Date(Date.now() + 60 * 60 * 1000)
  );
  const [showDatePickerInicio, setShowDatePickerInicio] = useState(false);
  const [showDatePickerFin, setShowDatePickerFin] = useState(false);
  const [showTimePickerInicio, setShowTimePickerInicio] = useState(false);
  const [showTimePickerFin, setShowTimePickerFin] = useState(false);
  const [tempFechaInicio, setTempFechaInicio] = useState(new Date());
  const [tempFechaFin, setTempFechaFin] = useState(new Date(Date.now() + 60 * 60 * 1000));
  
  // Estados para dropdowns
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [showEstadoDropdown, setShowEstadoDropdown] = useState(false);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPatients();
    loadEmployees();
  }, []);

  // Efecto para cargar datos en modo edición
  useEffect(() => {
    if (isEditMode && initialData && patients.length > 0 && employees.length > 0) {
      // Buscar paciente por ID
      if (initialData.pacienteId) {
        const patient = patients.find(p => Number(p.id) === initialData.pacienteId);
        if (patient) setSelectedPatient(patient);
      }
      // Buscar empleado por ID
      if (initialData.empleadoId) {
        const employee = employees.find(e => e.id === initialData.empleadoId);
        if (employee) setSelectedEmployee(employee);
      }
      // Cargar estado
      if (initialData.estadoCita) {
        setEstadoCita(initialData.estadoCita);
      }
    }
  }, [isEditMode, initialData, patients, employees]);

  const loadPatients = async () => {
    setLoadingPatients(true);
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error loading patients:', error);
    } finally {
      setLoadingPatients(false);
    }
  };

  const loadEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const handleCreateAppointment = async () => {
    if (!selectedPatient) {
      alert('Por favor seleccione un paciente');
      return;
    }
    if (!selectedEmployee) {
      alert('Por favor seleccione un empleado');
      return;
    }
    if (fechaFin <= fechaInicio) {
      alert('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && initialData?.id) {
        // Editar cita existente
        await editAppointment({
          id: initialData.id,
          fechaInicio: fechaInicio.toISOString(),
          fechaFin: fechaFin.toISOString(),
          estadoCita: estadoCita,
          pacienteId: Number(selectedPatient.id),
          empleadoId: selectedEmployee.id
        });
        alert('¡Cita actualizada exitosamente!');
      } else {
        // Crear nueva cita
        await addAppointment({
          fechaInicio: fechaInicio.toISOString(),
          fechaFin: fechaFin.toISOString(),
          estadoCita: estadoCita,
          pacienteId: Number(selectedPatient.id),
          empleadoId: selectedEmployee.id
        });
        alert('¡Cita creada exitosamente!');
        
        // Resetear formulario solo en modo crear
        setSelectedPatient(null);
        setSelectedEmployee(null);
        setEstadoCita(1);
        setFechaInicio(new Date());
        setFechaFin(new Date(Date.now() + 60 * 60 * 1000));
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      alert(isEditMode ? 'Error al actualizar la cita' : 'Error al crear la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Dropdown Paciente */}
      <View style={styles.inputGroup}>
        <MyText type="body2" style={styles.label}>Paciente</MyText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowPatientDropdown(!showPatientDropdown)}
        >
          <MyText type="body" style={selectedPatient ? styles.selectedText : styles.placeholderText}>
            {selectedPatient ? `${selectedPatient.nombres} ${selectedPatient.apellidos}` : 'Seleccionar paciente'}
          </MyText>
          <CustomIcon 
            name={showPatientDropdown ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
        
        {showPatientDropdown && (
          <View style={styles.dropdownList}>
            <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
              {patients.map((patient) => (
                <TouchableOpacity
                  key={patient.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedPatient(patient);
                    setShowPatientDropdown(false);
                  }}
                >
                  <MyText type="body">
                    {patient.nombres} {patient.apellidos}
                  </MyText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Dropdown Empleado */}
      <View style={styles.inputGroup}>
        <MyText type="body2" style={styles.label}>Doctor/Empleado</MyText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
        >
          <MyText type="body" style={selectedEmployee ? styles.selectedText : styles.placeholderText}>
            {selectedEmployee ? selectedEmployee.nombreCompleto : 'Seleccionar doctor'}
          </MyText>
          <CustomIcon 
            name={showEmployeeDropdown ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
        
        {showEmployeeDropdown && (
          <View style={styles.dropdownList}>
            <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
              {employees.map((employee) => (
                <TouchableOpacity
                  key={employee.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedEmployee(employee);
                    setShowEmployeeDropdown(false);
                  }}
                >
                  <MyText type="body">
                    {employee.nombreCompleto}
                  </MyText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Dropdown Estado */}
      <View style={styles.inputGroup}>
        <MyText type="body2" style={styles.label}>Estado de la Cita</MyText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowEstadoDropdown(!showEstadoDropdown)}
        >
          <MyText type="body" style={styles.selectedText}>
            {estadosOptions.find(e => e.id === estadoCita)?.label}
          </MyText>
          <CustomIcon 
            name={showEstadoDropdown ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
        
        {showEstadoDropdown && (
          <View style={styles.dropdownList}>
            {estadosOptions.map((estado) => (
              <TouchableOpacity
                key={estado.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setEstadoCita(estado.id);
                  setShowEstadoDropdown(false);
                }}
              >
                <MyText type="body">
                  {estado.label}
                </MyText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Fecha y Hora Inicio */}
      <View style={styles.inputGroup}>
        <MyText type="body2" style={styles.label}>Fecha y Hora de Inicio</MyText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setTempFechaInicio(fechaInicio);
            setShowDatePickerInicio(true);
          }}
        >
          <MyText type="body" style={styles.selectedText}>
            {formattedDate(fechaInicio.toISOString())} • {formatTime(fechaInicio)}
          </MyText>
          <CustomIcon name="Calendar" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Fecha y Hora Fin */}
      <View style={styles.inputGroup}>
        <MyText type="body2" style={styles.label}>Fecha y Hora de Fin</MyText>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setTempFechaFin(fechaFin);
            setShowDatePickerFin(true);
          }}
        >
          <MyText type="body" style={styles.selectedText}>
            {formattedDate(fechaFin.toISOString())} • {formatTime(fechaFin)}
          </MyText>
          <CustomIcon name="Calendar" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* DateTimePicker Inicio */}
      {Platform.OS === 'ios' ? (
        <Modal
          visible={showDatePickerInicio}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowDatePickerInicio(false)}>
                  <MyText type="body" style={{ color: colors.error }}>Cancelar</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setFechaInicio(tempFechaInicio);
                  setShowDatePickerInicio(false);
                }}>
                  <MyText type="body" style={{ color: colors.primary, fontWeight: 'bold' }}>Confirmar</MyText>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempFechaInicio}
                mode="datetime"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTempFechaInicio(selectedDate);
                  }
                }}
                style={{ backgroundColor: colors.background }}
              />
            </View>
          </View>
        </Modal>
      ) : (
        showDatePickerInicio && (
          <DateTimePicker
            value={fechaInicio}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePickerInicio(false);
              if (selectedDate) {
                setFechaInicio(selectedDate);
              }
            }}
          />
        )
      )}

      {/* DateTimePicker Fin */}
      {Platform.OS === 'ios' ? (
        <Modal
          visible={showDatePickerFin}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowDatePickerFin(false)}>
                  <MyText type="body" style={{ color: colors.error }}>Cancelar</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setFechaFin(tempFechaFin);
                  setShowDatePickerFin(false);
                }}>
                  <MyText type="body" style={{ color: colors.primary, fontWeight: 'bold' }}>Confirmar</MyText>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempFechaFin}
                mode="datetime"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTempFechaFin(selectedDate);
                  }
                }}
                style={{ backgroundColor: colors.background }}
              />
            </View>
          </View>
        </Modal>
      ) : (
        showDatePickerFin && (
          <DateTimePicker
            value={fechaFin}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePickerFin(false);
              if (selectedDate) {
                setFechaFin(selectedDate);
              }
            }}
          />
        )
      )}

      <MyButton
        title={loading ? 'Guardando...' : (isEditMode ? 'Actualizar Cita' : 'Guardar Cita')}
        onPress={handleCreateAppointment}
        disabled={loading}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  content: {
    gap: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: colors.text.secondary,
    marginLeft: 4,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  placeholderText: {
    color: colors.text.secondary,
  },
  selectedText: {
    color: colors.text.primary,
  },
  dropdownList: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 200,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  button: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default CreateAppointment;
