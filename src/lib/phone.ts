export const formatPhone = (value: string) => {
  const n = value.replace(/\D/g, '').slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
};

export const isValidPhone = (value: string) => value.replace(/\D/g, '').length === 11;
