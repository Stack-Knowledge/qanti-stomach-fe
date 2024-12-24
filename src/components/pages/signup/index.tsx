"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2).max(15),
  email: z.string().email(),
  phone: z.string().optional(),
  weight: z.number().min(1, "Weight must be greater than 0"),
  height: z.number().min(1, "Height must be greater than 0"),
  age: z.number().min(18, "Age must be at least 18"),
  gender: z.enum(["MALE", "FEMALE"]),
  activityLevel: z.enum([
    "SEDENTARY",
    "LIGHT",
    "MODERATE",
    "VERY_ACTIVE",
    "EXTREMELY_ACTIVE",
  ]),
  mealFrequency: z.number().min(1, "Meal frequency must be at least 1"),
});

const SignupPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      weight: undefined,
      height: undefined,
      age: undefined,
      gender: undefined,
      activityLevel: undefined,
      mealFrequency: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-neutral-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-neutral-900 bg-opacity-40 shadow-lg rounded-lg border border-neutral-800"
      >
        <h1 className="text-3xl font-bold text-neutral-100 text-center mb-6">
          Welcome to 지금 내 뱃속은
        </h1>
        <p className="text-neutral-400 text-center mb-6">
          Create your account to get started
        </p>
        <Form {...form} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full py-2 text-white font-medium rounded-md transition-colors duration-300 focus:outline-none"
            >
              Sign Up
            </Button>
          </motion.div>
        </Form>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-pulse" />
      </motion.div>

      <motion.div
        className="absolute top-72 left-6 w-32 h-32 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-3/4 -right-32 w-48 h-48 bg-emerald-600 opacity-30 rounded-full blur-3xl animate-pulse"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 200, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute inset-0 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3.5 }}
      >
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse delay-700" />
      </motion.div>
    </div>
  );
};

export default SignupPage;
