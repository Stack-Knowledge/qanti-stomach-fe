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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActivityLevel, Gender } from "@/types/user";
import { formSchema } from "./schema";
import { usePostSignup } from "@/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const SignupPage = () => {
  const { push } = useRouter();

  const { toast } = useToast();

  const { mutate } = usePostSignup({
    onSuccess: (res) => {
      Cookies.set("token", res.token);
      push("/");
      toast({
        title: `Congratulations on signing up, ${form.watch("name")}!`,
        description: "We will keep your personal information well.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

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
      check: false,
    },
  });

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "space-y-6",
            "max-h-[calc(100vh-248px)]",
            "overflow-y-scroll",
            "scrollbar-hide"
          )}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
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
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">
                  Email (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  We will never share your email with anyone.
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">
                  Phone Number (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  Please enter your phone number with country code (e.g.,
                  010-1234-5678).
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your weight in kg"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  Please enter your weight in kilograms (kg).
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Height (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your height in cm"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  Please enter your height in centimeters (cm).
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter your age"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  Please enter your age in years.
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">Gender</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value: Gender) =>
                      form.setValue("gender", value)
                    }
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-md">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border border-neutral-700">
                      <SelectItem value="MALE" className="text-neutral-100">
                        Male
                      </SelectItem>
                      <SelectItem value="FEMALE" className="text-neutral-100">
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  Please select your gender.
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">
                  Activity Level
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value: ActivityLevel) =>
                      form.setValue("activityLevel", value)
                    }
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-md">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border border-neutral-700">
                      <SelectItem
                        value="SEDENTARY"
                        className="text-neutral-100"
                      >
                        Sedentary (Little or no exercise)
                      </SelectItem>
                      <SelectItem value="LIGHT" className="text-neutral-100">
                        Lightly active (Exercise 1-3 days/week)
                      </SelectItem>
                      <SelectItem value="MODERATE" className="text-neutral-100">
                        Moderately active (Exercise 3-5 days/week)
                      </SelectItem>
                      <SelectItem
                        value="VERY_ACTIVE"
                        className="text-neutral-100"
                      >
                        Very active (Exercise 6-7 days/week)
                      </SelectItem>
                      <SelectItem
                        value="EXTREMELY_ACTIVE"
                        className="text-neutral-100"
                      >
                        Extremely active (Very intense exercise or physical job)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  Choose your level of physical activity to calculate your daily
                  calorie needs.
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mealFrequency"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">
                  Meal Frequency
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                    placeholder="Enter number of meals per day"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500 text-sm mt-1">
                  Please enter the number of meals you eat per day.
                </FormDescription>
                <FormMessage />
                {fieldState?.error && (
                  <FormMessage>
                    <p className="text-red-600 text-sm opacity-45">
                      {fieldState.error.message}
                    </p>
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="check"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Do you agree with the use of personal information to
                    calculate the volume?
                  </FormLabel>
                  <FormDescription>
                    It is only used to improve the service.
                  </FormDescription>
                  {fieldState?.error && (
                    <FormMessage>
                      <p className="text-red-600 text-sm opacity-45">
                        {fieldState.error.message}
                      </p>
                    </FormMessage>
                  )}
                </div>
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
        </form>
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
