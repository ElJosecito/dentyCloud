import { View, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import MyText from '@/shared/components/Text/MyText';
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper';
import { colors } from '@/shared/constants/index';
import CustomIcon from '@/shared/components/customIcon/CustomIcon';
import MyInput from '@/shared/components/Input/MyInput';
import { fetchEmployees } from '../service';
import type { Employee } from '@/api/employees';
import CreateEmployee from './CreateEmployee';

const EmployeesListScreen = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalVisible, setModalVisible] = useState(false);


  //funcion para cargar los empleados
  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  //funcion para manejar exito de creacion
  const handleEmployeeCreated = () => {
    loadEmployees();
    setModalVisible(false);
  };


  //funcion para actualizar la lista cada que se entre a la pantalla
  useFocusEffect(
    useCallback(() => {
      loadEmployees();
    }, [])
  );

  const renderEmployee = ({ item }: { item: Employee }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/(app)/employees/[id]',
        params: {
          id: item.id.toString(),
          nombreCompleto: item.nombreCompleto,
        }
      })}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.avatar}>
          <MyText type="h4" style={{ color: colors.primary, fontWeight: 'bold' }}>
            {item.nombreCompleto.charAt(0).toUpperCase()}
          </MyText>
        </View>
        <View style={styles.info}>
          <MyText type="body" style={[styles.name, { fontWeight: 'bold' }]}>
            {item.nombreCompleto}
          </MyText>
          <MyText type="caption1" style={styles.role}>
            Empleado
          </MyText>
        </View>
        <CustomIcon name="ChevronRight" size={20} color={colors.text.secondary} />
      </View>
    </TouchableOpacity>
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
        <MyText type="h1" style={{ fontWeight: 'bold' }}>
          Empleados
        </MyText>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <CustomIcon name="Plus" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <MyInput
          placeholder="Buscar empleados..."
          LeftIcon={<CustomIcon name="Search" size={20} color={colors.text?.secondary} />}
          variant="primary"
        />
      </View>

      {/* Lista */}
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEmployee}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <CustomIcon name="Users" size={48} color={colors.text.secondary} />
            <MyText type="body" style={styles.emptyText}>
              No hay empleados registrados
            </MyText>
          </View>
        )}
      />

      {/* Modal */}
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
            </View>
            <CreateEmployee onSuccess={handleEmployeeCreated} />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default EmployeesListScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addButton: {
    width: 46,
    height: 46,
    backgroundColor: colors.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: colors.text.primary,
  },
  role: {
    color: colors.text.secondary,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: colors.text.secondary,
    marginTop: 12,
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});