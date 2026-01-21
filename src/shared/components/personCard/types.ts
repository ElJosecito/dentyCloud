export type Patient = {
  id: string;
  nombres: string;
  apellidos?: string;
  fechaNacimiento?: string;
  sexo?: string;
};

export type PersonCardProps = {
  patient: Patient;
  onPhonePress?: (patientId: string) => void;
  onCardPress?: (patientId: string) => void;
};
