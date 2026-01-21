import { View, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper';
import MyText from '@/shared/components/Text/MyText';
import Avatar from '@/shared/components/AvatarPicture/Avatar';
import { colors } from '@/shared/constants';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import { fetchEmployeeById, removeEmployee } from '../service';
import type { Employee } from '@/api/employees';
import CreateEmployee from './CreateEmployee';

const EmployeeDetailScreen = () => {
  const router = useRouter();
  const { id, nombreCompleto } = useLocalSearchParams<{ id: string; nombreCompleto: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      loadEmployee();
    }
  }, [id]);

  const loadEmployee = async () => {
    try {
      const data = await fetchEmployeeById(parseInt(id as string));
      setEmployee(data);
    } catch (error) {
      console.error('Error loading employee:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Empleado',
      `¿Estás seguro de que deseas eliminar a ${employee?.nombreCompleto || nombreCompleto}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeEmployee(parseInt(id as string));
              router.back();
            } catch (error) {
              console.error('Error deleting employee:', error);
              Alert.alert('Error', 'No se pudo eliminar el empleado');
            }
          },
        },
      ]
    );
  };

  const handleEditSuccess = () => {
    setEditModalVisible(false);
    loadEmployee();
  };

  const displayName = employee?.nombreCompleto || nombreCompleto || 'Empleado';

  return (
    <ScreenWrapper
      withSafeArea
      withTopSafeArea={false}
      withBottomSafeArea={true}
      withHorizontalPadding={true}
      scrollable={true}
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <CustomIcon name="ChevronLeft" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <MyText type="h3" style={{ color: colors.text.primary, fontWeight: 'bold' }}>
          Detalle del Empleado
        </MyText>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setEditModalVisible(true)}>
          <CustomIcon name="Edit" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Avatar y nombre */}
      <View style={styles.profileSection}>
        <Avatar name={displayName} size={80} />
        <MyText type="h2" style={[styles.nameText, { fontWeight: 'bold' }]}>
          {displayName}
        </MyText>
        <MyText type="body2" style={styles.roleText}>
          Empleado
        </MyText>
      </View>

      {/* Información */}
      <View style={styles.section}>
        <MyText type="h4" style={[styles.sectionTitle, { fontWeight: 'bold' }]}>
          Información
        </MyText>
        <View style={styles.infoCard}>
          <View style={[styles.infoRow, styles.infoRowBorder]}>
            <View style={styles.infoLeft}>
              <CustomIcon name="Hash" size={18} color={colors.text.secondary} />
              <MyText type="body2" style={styles.infoLabel}>ID</MyText>
            </View>
            <MyText type="body2" style={[styles.infoValue, { fontWeight: 'bold' }]}>{id}</MyText>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <CustomIcon name="User" size={18} color={colors.text.secondary} />
              <MyText type="body2" style={styles.infoLabel}>Nombre Completo</MyText>
            </View>
            <MyText type="body2" style={[styles.infoValue, { fontWeight: 'bold' }]}>{displayName}</MyText>
          </View>
        </View>
      </View>

      {/* Botón Eliminar */}
      <View style={styles.deleteContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <CustomIcon name="Trash2" size={20} color={colors.error} />
          <MyText type="body" style={styles.deleteText}>Eliminar Empleado</MyText>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
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
          <CreateEmployee
            onSuccess={handleEditSuccess}
            isEditMode={true}
            initialData={employee || undefined}
          />
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default EmployeeDetailScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerBtn: {
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
  roleText: {
    marginTop: 4,
    color: colors.text.secondary,
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
  deleteContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
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
});