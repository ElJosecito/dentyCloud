import { View, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React,{ useState, useCallback } from 'react'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import MyButton from '@/shared/components/Button/MyButton'
import MyText from '@/shared/components/Text/MyText'
import ScreenWrapper from '@/shared/components/ScreenWrapper/ScreenWrapper'
import { colors } from '@/shared/constants/index'
import CustomIcon from '@/shared/components/customIcon/CustomIcon'
import MyInput from '@/shared/components/Input/MyInput'
import PersonCard from '@/shared/components/personCard/PersonCard'
import { fetchPatients } from '../service'
import type { Patient } from '@/api/patients'
import CreatePatient from './CreatePatient'


const PatientsListScreen = () => {
  const router = useRouter();

  const [patients, setPatients] = useState<Array<Patient>>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handlePatientCreated = () => {
    loadPatients();
    setModalVisible(false);
  };

  //funcion para actualizar la lista cada que se entre a la pantalla
  useFocusEffect(
    useCallback(() => {
      loadPatients();
    }, [])
  );

  return (
    <ScreenWrapper
      withSafeArea
      withTopSafeArea={false}
      withBottomSafeArea={true}
      withHorizontalPadding={true}
      scrollable={false}
      style={{ backgroundColor: colors.background }}
    >
      <View style={{ marginBottom: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row',  }}>
        <MyText type='h1' style={{ fontWeight: 'bold' }}>
          Pacientes
        </MyText>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={{width: 46, height: 46, backgroundColor: colors.primary, borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}
        >
          <CustomIcon name='Plus' size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={{ marginBottom: 16 }}>
        <MyInput
          placeholder='Buscar pacientes...'
          LeftIcon={<CustomIcon name='Search' size={20} color={colors.text?.secondary} />}
          variant='primary'

        />
      </View>

      {/* lista de pacientes */}
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={{ width: '100%' }}>
              <PersonCard 
                patient={item} 
                onPhonePress={(id) => console.log('call', id)}
                onCardPress={(id) => router.push({
                  pathname: `/(app)/patients/${id}`,
                  params: { 
                    nombres: item.nombres,
                    apellidos: item.apellidos,
                    fechaNacimiento: item.fechaNacimiento,
                    sexo: item.sexo
                  }
                })} 
              />
            </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 32, alignItems: 'center' }}>
            <MyText type='body' style={{ color: colors.text?.secondary }}>
              No se encontraron pacientes.
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
          <View style={{backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 16, paddingRight:16}}>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: 'flex-end', marginBottom: 16 }}
            >
              <CustomIcon
                name="X"
                size={24}
                color={colors.text.primary}
              />
            </TouchableOpacity>
          </View>
          <CreatePatient onSuccess={handlePatientCreated} />
        </View>
      </Modal>

    </ScreenWrapper>
  )
}

export default PatientsListScreen

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameBlock: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameText: {
    color: colors.text.primary,
  },
  subText: {
    color: colors.text.secondary,
    marginTop: 2,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray?.[100],
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});