'use client';

import { createContext, useContext, useState } from 'react';

export type FormData = {
  industry: string;
  targetWork: string;
  currentFlow: string;
  problems: string;
  idealState: string;
};

const initialData: FormData = {
  industry: '',
  targetWork: '',
  currentFlow: '',
  problems: '',
  idealState: '',
};

type FormContextType = {
  data: FormData;
  setData: (data: FormData) => void;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>(initialData);
  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm(): FormContextType {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}
