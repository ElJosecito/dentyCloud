# 🦷 DentyCloud

Aplicación móvil para la gestión de clínicas dentales desarrollada con React Native y Expo.

## 📱 Tecnologías

- **React Native** 0.81.5
- **Expo SDK** 54
- **TypeScript**
- **Expo Router** - Navegación basada en archivos
- **Axios** - Cliente HTTP para consumo de APIs

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Expo Go app instalada en tu dispositivo móvil
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Instalación

1. Instala las dependencias:
```bash
npm install
```

1. Inicia el servidor de desarrollo:
```bash
npm start
```

3. Escanea el código QR con Expo Go:
   - **iOS**: Usa la cámara del iPhone para escanear el QR
   - **Android**: Abre Expo Go y escanea el QR

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run ios` | Inicia la app en el simulador de iOS |
| `npm run android` | Inicia la app en el emulador de Android |

## 📁 Estructura del Proyecto

```
dentyCloud/
├── app/                          # Rutas de la aplicación (Expo Router)
│   ├── _layout.tsx               # Layout principal
│   ├── index.tsx                 # Punto de entrada (auth check)
│   └── (app)/                    # Rutas protegidas (autenticadas)
│       ├── _layout.tsx           # Layout con tabs
│       ├── profile.tsx           # Pantalla de perfil
│       ├── appointments/         # Módulo de citas
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   └── [id].tsx          # Detalle de cita
│       ├── patients/             # Módulo de pacientes
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   └── [id].tsx          # Detalle de paciente
│       └── employees/            # Módulo de empleados
│           ├── _layout.tsx
│           ├── index.tsx
│           └── [id].tsx          # Detalle de empleado
│
├── src/                          # Código fuente principal
│   ├── api/                      # Servicios de API
│   │   ├── axiosInstance.ts      # Configuración de Axios
│   │   ├── appointments.ts       # API de citas
│   │   ├── patients.ts           # API de pacientes
│   │   ├── employees.ts          # API de empleados
│   │   └── auth.ts               # API de autenticación
│   │
│   ├── auth/                     # Contexto de autenticación
│   │   └── AuthProvider.tsx      # Provider de auth con token
│   │
│   ├── features/                 # Módulos de funcionalidades
│   │   ├── appointments/         # Feature de citas
│   │   │   ├── service.ts        # Lógica de negocio
│   │   │   └── screens/          # Pantallas
│   │   │       ├── AppointmentsListScreen.tsx
│   │   │       ├── AppointmentDetailScreen.tsx
│   │   │       └── CreateAppointment.tsx
│   │   │
│   │   ├── patients/             # Feature de pacientes
│   │   │   ├── service.ts
│   │   │   └── screens/
│   │   │       ├── PatientsListScreen.tsx
│   │   │       ├── PatientDetailScreen.tsx
│   │   │       └── CreatePatient.tsx
│   │   │
│   │   ├── employees/            # Feature de empleados
│   │   │   ├── service.ts
│   │   │   └── screens/
│   │   │       ├── EmployeesListScreen.tsx
│   │   │       ├── EmployeeDetailScreen.tsx
│   │   │       └── CreateEmployee.tsx
│   │   │
│   │   └── auth/                 # Feature de autenticación
│   │       ├── service.ts
│   │       ├── types.ts
│   │       └── screens/
│   │           └── LoginScreen.tsx
│   │
│   └── shared/                   # Código compartido
│       ├── components/           # Componentes reutilizables
│       │   ├── Button/
│       │   ├── Input/
│       │   ├── Text/
│       │   ├── ScreenWrapper/
│       │   ├── AppointmentCard/
│       │   ├── AvatarPicture/
│       │   ├── customIcon/
│       │   └── StatusBadge/
│       │
│       ├── constants/            # Constantes globales
│       │   ├── colors.ts         # Paleta de colores
│       │   └── index.ts
│       │
│       ├── hooks/                # Custom hooks
│       │   └── useAsync.ts
│       │
│       └── utils/                # Utilidades
│           └── utils.ts          # Funciones helper
│
├── assets/                       # Recursos estáticos
├── app.json                      # Configuración de Expo
├── package.json                  # Dependencias
└── tsconfig.json                 # Configuración de TypeScript
```

## 🔐 Autenticación

La app utiliza autenticación basada en tokens JWT:
- El token se almacena de forma segura con `expo-secure-store`
- Al iniciar, la app verifica si existe un token válido
- Si hay token, redirige a la app; si no, muestra el login