// funciones utils

export const formattedDate = (dateString?: string | null): string => {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

export default {
  formattedDate,
  formatTime,
};