import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Modal, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper';
import MyText from '@/shared/components/Text/MyText';
import Avatar from '@/shared/components/AvatarPicture/Avatar';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import type { IconName } from '@/shared/components/customIcon/types';
import { colors } from '@/shared/constants/index';
import { formattedDate } from '@/shared/utils/utils';
import CreatePatient from './CreatePatient';
import { removePatient } from '../service';

interface RowInterface {
  icon: IconName;
  label: string;
  value: string;
  isLast?: boolean;
}

const PatientDetailScreen = () => {
  const { id, nombres, apellidos, fechaNacimiento, sexo } = useLocalSearchParams<{ 
    id: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    sexo: string;
  }>();
  const router = useRouter();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [patientData, setPatientData] = useState({
    id,
    nombres,
    apellidos,
    fechaNacimiento,
    sexo,
  });

  const handleEditSuccess = () => {
    setEditModalVisible(false);
    // Actualizar datos locales (idealmente re-fetch desde API)
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Paciente',
      `¿Estás seguro de que deseas eliminar a ${nombres} ${apellidos}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removePatient(parseInt(id as string));
              router.back();
            } catch (error) {
              console.error('Error deleting patient:', error);
              Alert.alert('Error', 'No se pudo eliminar el paciente');
            }
          },
        },
      ]
    );
  };


  // dummy data, para llenar pantalla
  const mockData = {
    telefono: '+1234567890',
    email: 'john.doe@example.com',
    direccion: '123 Main St, City',
  };

  return (
    <ScreenWrapper
      withSafeArea
      withTopSafeArea={false}
      withBottomSafeArea={false}
      withHorizontalPadding={true}
      scrollable={true}
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <CustomIcon name="ChevronLeft" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <MyText type="h3" style={[{ color: colors.background, fontWeight: 'bold' }]}>
          Detalle del Paciente
        </MyText>
        <TouchableOpacity style={styles.editBtn} onPress={() => setEditModalVisible(true)}>
          <CustomIcon name="Edit" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Avatar y nombre */}
      <View style={styles.profileSection}>
        <Avatar name={nombres} size={80} />
        <MyText type="h2" style={[styles.nameText, { fontWeight: 'bold' }]}>
          {nombres} {apellidos}
        </MyText>
      </View>

      {/* Acciones rápidas palce holders */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <CustomIcon name="Phone" size={20} color={colors.primary} />
          </View>
          <MyText type="caption1" style={styles.actionLabel}>
            Llamar
          </MyText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <CustomIcon name="Mail" size={20} color={colors.primary} />
          </View>
          <MyText type="caption1" style={styles.actionLabel}>
            Email
          </MyText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <CustomIcon name="Calendar" size={20} color={colors.primary} />
          </View>
          <MyText type="caption1" style={styles.actionLabel}>
            Citas
          </MyText>
        </TouchableOpacity>
      </View>

      {/* Información personal */}
      <View style={styles.section}>
        <MyText type="h4" style={[styles.sectionTitle, { fontWeight: 'bold' }]}>
          Información Personal
        </MyText>

        <View style={styles.infoCard}>
          <InfoRow icon="Calendar" label="Fecha de Nacimiento" value={formattedDate(fechaNacimiento)} />
          <InfoRow icon="User" label="Sexo" value={sexo === 'M' ? 'Masculino' : 'Femenino'} />
          <InfoRow icon="Phone" label="Teléfono" value={mockData.telefono} />
          <InfoRow icon="Mail" label="Email" value={mockData.email} />
          <InfoRow icon="MapPin" label="Dirección" value={mockData.direccion} isLast />
        </View>
      </View>

      {/* Botón Eliminar */}
      <View style={styles.deleteContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <CustomIcon name="Trash2" size={20} color={colors.error} />
          <MyText type="body" style={styles.deleteText}>Eliminar Paciente</MyText>
        </TouchableOpacity>
      </View>

      {/* Modal de Edición */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <CustomIcon name="X" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            <CreatePatient 
              onSuccess={handleEditSuccess}
              initialData={patientData}
              isEditMode={true}
            />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  nameText: {
    marginTop: 16,
    color: colors.text.primary,
  },
  idText: {
    marginTop: 4,
    color: colors.text.secondary,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    color: colors.text.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    color: colors.text.primary,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
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
  emptyState: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    color: colors.text.secondary,
  },
  deleteContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error + '30',
    backgroundColor: colors.error + '10',
  },
  deleteText: {
    color: colors.error,
    fontWeight: '600',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
});

export default PatientDetailScreen;