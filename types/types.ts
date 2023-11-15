export type User = {
  id: string;
  name: string;
  email: string;
  status: 'selected' | 'picked' | 'brewed';
};

export type RegisterFormValues = {
  name: string;
  email: string;
};
