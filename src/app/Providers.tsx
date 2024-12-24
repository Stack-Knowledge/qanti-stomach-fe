"use client";

import { FormProvider, useForm } from "react-hook-form";
import { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const Providers = ({ children }: PropsWithChildren) => {
  const methods = useForm();
  const [client] = React.useState(new QueryClient());

  return (
    <FormProvider {...methods}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
      <Toaster />
    </FormProvider>
  );
};

export default Providers;
