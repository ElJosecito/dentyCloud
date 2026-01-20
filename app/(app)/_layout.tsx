import { useContext } from 'react';
import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { AuthContext } from '../../src/auth/AuthProvider';
import LoadingView from '../../src/shared/components/LoadingView';
import { Calendar, Users, Briefcase, User } from 'lucide-react-native';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useContext(AuthContext)!;

  if (isLoading) {
    return <LoadingView />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#2C6BED',
      }}
    >
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ color, focused, size }) => (
            <Calendar color={color} size={size ?? 20} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: 'Patients',
          tabBarIcon: ({ color, focused, size }) => (
            <Users color={color} size={size ?? 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          title: 'Employees',
          tabBarIcon: ({ color, focused, size }) => (
            <Briefcase color={color} size={size ?? 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <User color={color} size={size ?? 20} />
          ),
        }}
      />
    </Tabs>
  );
}
