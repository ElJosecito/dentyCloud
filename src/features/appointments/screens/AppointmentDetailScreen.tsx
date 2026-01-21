import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper';
import MyText from '@/shared/components/Text/MyText';
import Avatar from '@/shared/components/AvatarPicture/Avatar';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import type { IconName } from '@/shared/components/customIcon/types';
import StatusBadge from '@/shared/components/StatusBadge/StatusBadge';
import CreateAppointment from './CreateAppointment';
import { colors } from '@/shared/constants/index';
import { formattedDate, formatTime } from '@/shared/utils/utils';
import { removeAppointment } from '../service';

interface RowInterface {
  icon: IconName;
  label: string;
  value: string;
  isLast?: boolean;
}

const AppointmentDetailScreen = () => {
  const params = useLocalSearchParams<{ 
    id: string;
    fechaInicio: string;
    fechaFin: string;
    estadoCita: string;
    estado: string;
    pacienteId: string;
    pacienteNombres: string;
    pacienteApellidos: string;
    empleadoId: string;
    empleadoNombre: string;
  }>();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  //funcion para manejar success de edicion
  const handleEditSuccess = () => {
    setModalVisible(false);
    router.back();
  };

  //funcion para eliminar cita
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Cita',
      `¿Estás seguro de que deseas eliminar esta cita de ${params.pacienteNombres} ${params.pacienteApellidos}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeAppointment(parseInt(params.id));
              router.back();
            } catch (error) {
              console.error('Error deleting appointment:', error);
              Alert.alert('Error', 'No se pudo eliminar la cita');
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenWrapper
      withSafeArea
      withTopSafeArea={false}
      withBottomSafeArea={true}
      withHorizontalPadding={false}
      scrollable={false}
      style={{ backgroundColor: colors.background }}
    >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Avatar size={80} name={`${params.pacienteNombres} ${params.pacienteApellidos}`} />
            <MyText type="h2" style={[styles.patientName, { fontWeight: 'bold' }]}>
              {params.pacienteNombres} {params.pacienteApellidos}
            </MyText>
            <StatusBadge 
              status={parseInt(params.estadoCita)} 
              statusText={params.estado} 
              size="large"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
            <CustomIcon name="Edit" size={20} color={colors.primary} />
            <MyText type="body2" style={styles.actionText}>Editar</MyText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <CustomIcon name="Trash2" size={20} color={colors.danger} />
            <MyText type="body2" style={[styles.actionText, { color: colors.danger }]}>Eliminar</MyText>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <MyText type="h4" style={[styles.sectionTitle, { fontWeight: 'bold' }]}> 
            Información de la Cita
          </MyText>
          <View style={styles.infoCard}>
            <InfoRow
              icon="Calendar"
              label="Fecha Inicio"
              value={`${formattedDate(params.fechaInicio)} • ${formatTime(params.fechaInicio)}`}
            />
            <InfoRow
              icon="Clock"
              label="Fecha Fin"
              value={`${formattedDate(params.fechaFin)} • ${formatTime(params.fechaFin)}`}
            />
            <InfoRow
              icon="User"
              label="Doctor"
              value={params.empleadoNombre}
              isLast
            />
          </View>
        </View>

        {/* Modal de Edición */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  style={{ alignSelf: 'flex-end' }}
                >
                  <CustomIcon name="X" size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <MyText type="h2" style={{ marginTop: 8, fontWeight: 'bold' }}>Editar Cita</MyText>
              </View>
              <CreateAppointment 
                onSuccess={handleEditSuccess}
                isEditMode={true}
                initialData={{
                  id: parseInt(params.id),
                  fechaInicio: params.fechaInicio,
                  fechaFin: params.fechaFin,
                  estadoCita: parseInt(params.estadoCita),
                  pacienteId: parseInt(params.pacienteId),
                  pacienteNombres: params.pacienteNombres,
                  pacienteApellidos: params.pacienteApellidos,
                  empleadoId: parseInt(params.empleadoId),
                  empleadoNombre: params.empleadoNombre,
                }}
              />
            </View>
          </View>
        </Modal>
    </ScreenWrapper>
  );
};

const InfoRow = ({icon, label, value, isLast} : RowInterface ) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <View style={styles.infoLeft}>
      <CustomIcon name={icon} size={18} color={colors.text.secondary} />
      <MyText type="body2" style={styles.infoLabel}>
        {label}
      </MyText>
    </View>
    <MyText type="body2" style={[styles.infoValue, { fontWeight: 'bold' }]}>
      {value}
    </MyText>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.card,
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
    gap: 12,
  },
  patientName: {
    color: colors.text.primary,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.card,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    color: colors.primary,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.text.primary,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    color: colors.text.secondary,
  },
  infoValue: {
    color: colors.text.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default AppointmentDetailScreen;