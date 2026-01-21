import { View, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper'
import MyText from '@/shared/components/Text/MyText'
import CustomIcon from '@/shared/components/customIcon/CustomIcon'
import AppointmentCard from '@/shared/components/AppointmentCard/AppointmentCard'
import CreateAppointment from './CreateAppointment'
import { colors } from '@/shared/constants/index'
import { fetchAppointments } from '../service'
import { Appointment } from '@/api/appointments'
import MyInput from '@/shared/components/Input/MyInput'

const AppointmentsListScreen = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);


  //funcion para cargar las citas
  const loadAppointments = async () => {
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAppointmentCreated = () => {
    loadAppointments();
    setModalVisible(false);
  };

  //funcion para actualizar la lista cada que se entre a la pantalla
  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [])
  );

  return (
    <ScreenWrapper
      withSafeArea
      withTopSafeArea={false}
      withBottomSafeArea={true}
      withHorizontalPadding={false}
      scrollable={false}
      style={{ backgroundColor: colors.background }}
    >
      <View style={styles.header}>
        <MyText type='h1' style={{ fontWeight: 'bold' }}>
          Citas
        </MyText>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <CustomIcon name='Plus' size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
        <MyInput
          placeholder='Buscar pacientes...'
          LeftIcon={<CustomIcon name='Search' size={20} color={colors.text?.secondary} />}
          variant='primary'

        />
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <AppointmentCard
            appointment={item}
            onPress={() => router.push({
              pathname: '/appointments/[id]',
              params: { 
                id: item.id.toString(),
                fechaInicio: item.fechaInicio,
                fechaFin: item.fechaFin,
                estadoCita: item.estadoCita.toString(),
                estado: item.estado,
                pacienteId: item.paciente.id.toString(),
                pacienteNombres: item.paciente.nombres,
                pacienteApellidos: item.paciente.apellidos,
                empleadoId: item.empleadoAtiende.id.toString(),
                empleadoNombre: item.empleadoAtiende.nombreCompleto,
              }
            })}
            isLast={index === appointments.length - 1}
          />
        )}
        contentContainerStyle={[styles.listContent, appointments.length === 0 && styles.emptyListContent]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <CustomIcon name="CalendarOff" size={48} color={colors.text.secondary} />
            <MyText type="h4" style={styles.emptyTitle}>No hay citas</MyText>
            <MyText type="body2" style={styles.emptyText}>
              No tienes citas programadas. Presiona el botón + para crear una nueva.
            </MyText>
          </View>
        )}
      />

      {/* Modal de Crear Cita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <MyText type="h4" style={styles.modalTitle}>
                Nueva Cita
              </MyText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <CustomIcon name="X" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            <CreateAppointment onSuccess={handleAppointmentCreated} />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  addButton: {
    width: 46,
    height: 46,
    backgroundColor: colors.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  emptyListContent: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: colors.text.primary,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
});

export default AppointmentsListScreen