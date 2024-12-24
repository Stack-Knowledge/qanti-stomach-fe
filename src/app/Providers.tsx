"use client";

import { FormProvider, useForm } from "react-hook-form";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  const methods = useForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Providers;
