import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyText from '@/shared/components/Text/MyText';
import MyInput from '@/shared/components/Input/MyInput';
import MyButton from '@/shared/components/Button/MyButton';
import { colors } from '@/shared/constants/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { addEmployee, editEmployee } from '../service';

interface EmployeeData {
  id?: number;
  nombreCompleto?: string;
}

interface CreateEmployeeProps {
  onSuccess?: () => void;
  initialData?: EmployeeData;
  isEditMode?: boolean;
}

const CreateEmployee = ({ onSuccess, initialData, isEditMode = false }: CreateEmployeeProps) => {
  const insets = useSafeAreaInsets();
  const [nombreCompleto, setNombreCompleto] = useState(initialData?.nombreCompleto || '');
  const [loading, setLoading] = useState(false);

  //efectt para poblar datos de edicion
  useEffect(() => {
    if (initialData) {
      setNombreCompleto(initialData.nombreCompleto || '');
    }
  }, [initialData]);

  // Función para manejar el guardado del empleado
  const handleSave = async () => {
    if (!nombreCompleto.trim()) {
      alert('Por favor ingrese el nombre completo');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && initialData?.id) {
        await editEmployee({
          id: initialData.id,
          nombreCompleto: nombreCompleto.trim(),
        });
        alert('¡Empleado actualizado exitosamente!');
      } else {
        await addEmployee({
          nombreCompleto: nombreCompleto.trim(),
        });
        alert('¡Empleado creado exitosamente!');
        setNombreCompleto('');
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      alert(isEditMode ? 'Error al actualizar el empleado.' : 'Error al crear el empleado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <MyText type="h1" style={{ marginBottom: 24, fontWeight: 'bold' }}>
        {isEditMode ? 'Editar Empleado' : 'Crear Empleado'}
      </MyText>

      <MyInput
        label="Nombre Completo"
        placeholder="Ingrese el nombre completo"
        variant="secondary"
        style={{ marginBottom: 16 }}
        value={nombreCompleto}
        onChangeText={setNombreCompleto}
      />

      <MyButton
        title={loading ? 'Guardando...' : (isEditMode ? 'Actualizar Empleado' : 'Guardar Empleado')}
        onPress={handleSave}
        style={{ marginTop: 24 }}
        disabled={loading}
      />
    </View>
  );
};

export default CreateEmployee;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
});
