import { View, Text, TouchableOpacity, Platform, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import MyText from '@/shared/components/Text/MyText'
import MyInput from '@/shared/components/Input/MyInput'
import MyButton from '@/shared/components/Button/MyButton'
import { colors } from '@/shared/constants/index'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker'
import { formattedDate } from '@/shared/utils/utils'
import CustomIcon from '@/shared/components/customIcon/CustomIcon'
import { addPatient, editPatient } from '../service'

interface PatientData {
  id?: string;
  nombres?: string;
  apellidos?: string;
  fechaNacimiento?: string;
  sexo?: string;
}

interface CreatePatientProps {
  onSuccess?: () => void;
  initialData?: PatientData;
  isEditMode?: boolean;
}

const CreatePatient = ({ onSuccess, initialData, isEditMode = false }: CreatePatientProps) => {
    const insets = useSafeAreaInsets();
    const [nombres, setNombres] = useState(initialData?.nombres || '');
    const [apellidos, setApellidos] = useState(initialData?.apellidos || '');
    const [date, setDate] = useState(
      initialData?.fechaNacimiento ? new Date(initialData.fechaNacimiento) : new Date()
    );
    const [tempDate, setTempDate] = useState(
      initialData?.fechaNacimiento ? new Date(initialData.fechaNacimiento) : new Date()
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [sexo, setSexo] = useState<'M' | 'F' | ''>((initialData?.sexo as 'M' | 'F') || '');
    const [showSexoDropdown, setShowSexoDropdown] = useState(false);
    const [loading, setLoading] = useState(false);



    //efecto para cargar datos
    useEffect(() => {
      if (initialData) {
        setNombres(initialData.nombres || '');
        setApellidos(initialData.apellidos || '');
        if (initialData.fechaNacimiento) {
          setDate(new Date(initialData.fechaNacimiento));
          setTempDate(new Date(initialData.fechaNacimiento));
        }
        setSexo((initialData.sexo as 'M' | 'F') || '');
      }
    }, [initialData]);

    
    //funcion para manejar cambio de fecha
    const onDateChange = (event: any, selectedDate?: Date) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
        if (selectedDate) {
          setDate(selectedDate);
        }
      } else {
        if (selectedDate) {
          setTempDate(selectedDate);
        }
      }
    };

    const confirmDate = () => {
      setDate(tempDate);
      setShowDatePicker(false);
    };


    //funcion para manejar creacion de paciente
    const handleCreatePatient = async () => {
      // Validar campos
      if (!nombres.trim()) {
        alert('Por favor ingrese los nombres');
        return;
      }
      if (!apellidos.trim()) {
        alert('Por favor ingrese los apellidos');
        return;
      }
      if (!sexo) {
        alert('Por favor seleccione el sexo');
        return;
      }

      setLoading(true);
      try {
        if (isEditMode && initialData?.id) {
          // Editar paciente existente
          await editPatient(initialData.id, {
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            fechaNacimiento: date.toISOString().split('T')[0],
            sexo: sexo,
          });
          alert('¡Paciente actualizado exitosamente!');
        } else {
          // Crear nuevo paciente
          await addPatient({
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            fechaNacimiento: date.toISOString().split('T')[0],
            sexo: sexo,
          });
          alert('¡Paciente creado exitosamente!');
          
          // Limpiar formulario solo en modo crear
          setNombres('');
          setApellidos('');
          setDate(new Date());
          setSexo('');
        }

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error('Error:', error);
        alert(isEditMode ? 'Error al actualizar el paciente.' : 'Error al crear el paciente.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <View
        style={{ padding: 16, backgroundColor: colors.background, paddingBottom: insets.bottom }}
    >
      <MyText type='h1' bold style={{ marginBottom: 24 }}>
        {isEditMode ? 'Editar Paciente' : 'Crear Paciente'}
      </MyText>

      <MyInput
        label='Nombres'
        placeholder='Ingrese los nombres'
        variant='secondary'
        style={{ marginBottom: 16 }}
        value={nombres}
        onChangeText={setNombres}
      />

      <MyInput
        label='Apellidos'
        placeholder='Ingrese los apellidos'
        variant='secondary'
        style={{ marginBottom: 16 }}
        value={apellidos}
        onChangeText={setApellidos}
      />

      <View style={{ marginBottom: 16 }}>
        <MyText type='body2' style={{ marginBottom: 8, color: colors.text.secondary }}>
          Fecha de Nacimiento
        </MyText>
        <TouchableOpacity
          onPress={() => {
            setTempDate(date);
            setShowDatePicker(true);
          }}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            padding: 16,
            backgroundColor: colors.card,
          }}
        >
          <MyText type='body'>{formattedDate(date.toISOString())}</MyText>
        </TouchableOpacity>
        
        {Platform.OS === 'ios' ? (
          <Modal
            visible={showDatePicker}
            transparent
            animationType="slide"
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <MyText type='body' style={{ color: colors.error }}>Cancelar</MyText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmDate}>
                    <MyText type='body' bold style={{ color: colors.primary }}>Confirmar</MyText>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  style={{ backgroundColor: colors.background }}
                />
              </View>
            </View>
          </Modal>
        ) : (
          showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )
        )}
      </View>

      {/* Selector de Sexo */}
      <View style={{ marginBottom: 16 }}>
        <MyText type='body2' style={{ marginBottom: 8, color: colors.text.secondary }}>
          Sexo
        </MyText>
        <TouchableOpacity
          onPress={() => setShowSexoDropdown(!showSexoDropdown)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            padding: 16,
            backgroundColor: colors.card,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MyText type='body' style={{ color: sexo ? colors.text.primary : colors.text.secondary }}>
            {sexo === 'M' ? 'Masculino' : sexo === 'F' ? 'Femenino' : 'Seleccione'}
          </MyText>
          <CustomIcon name='ChevronDown' size={20} color={colors.text.secondary} />
        </TouchableOpacity>
        
        {showSexoDropdown && (
          <View style={{ 
            marginTop: 4, 
            borderWidth: 1, 
            borderColor: colors.border, 
            borderRadius: 12, 
            backgroundColor: colors.card,
            overflow: 'hidden'
          }}>
            <TouchableOpacity
              onPress={() => {
                setSexo('M');
                setShowSexoDropdown(false);
              }}
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <MyText type='body'>Masculino</MyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSexo('F');
                setShowSexoDropdown(false);
              }}
              style={{
                padding: 16,
              }}
            >
              <MyText type='body'>Femenino</MyText>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <MyButton
        title={loading ? 'Guardando...' : (isEditMode ? 'Actualizar Paciente' : 'Guardar Paciente')}
        onPress={handleCreatePatient}
        style={{ marginTop: 24 }}
        disabled={loading}
      />
    </View>
  )
}

export default CreatePatient