"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/types/user";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface AlcoholFormData {
  weight: number;
  height: number;
  gender: "MALE" | "FEMALE" | "";
  hours: number;
  aldh2Mutation: boolean;
  hasEaten: boolean;
}

const AlcoholPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AlcoholFormData>();
  const [alcoholTolerance, setAlcoholTolerance] = useState<number | null>(null);
  const [soju, setSoju] = useState<number | null>(null);
  const [beer, setBeer] = useState<number | null>(null);
  const { toast } = useToast();

  const scrollToElement = () => {
    const targetElement = document.getElementById("target-element");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const calculateAlcoholTolerance = (data: AlcoholFormData) => {
    const weight = Number(data.weight);
    const height = Number(data.height);
    const hours = 24;
    const { gender, aldh2Mutation, hasEaten } = data;

    if (isNaN(weight) || isNaN(height) || height === 0) {
      setAlcoholTolerance(null);
      setSoju(null);
      setBeer(null);
      toast({
        title: "모든 값을 정상적으로 입력해주세요",
      });
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let baseRate = gender === "MALE" ? 0.68 : 0.55;
    if (aldh2Mutation) baseRate *= 0.8;

    let alcoholToleranceValue = (weight * baseRate * hours) / 10;

    if (hasEaten) alcoholToleranceValue *= 0.9;

    if (isNaN(alcoholToleranceValue) || alcoholToleranceValue <= 0) {
      setAlcoholTolerance(null);
      setSoju(null);
      setBeer(null);

      toast({
        title: "비정상적인 값이에요!!",
      });

      return;
    }

    console.log("test");
    setTimeout(scrollToElement, 1000);

    setAlcoholTolerance(alcoholToleranceValue);

    const sojuTolerance = Math.ceil(alcoholToleranceValue / 7);
    const beerTolerance = Math.ceil(alcoholToleranceValue / 15);

    setSoju(sojuTolerance);
    setBeer(beerTolerance);
  };

  const onSubmit = (data: AlcoholFormData) => {
    calculateAlcoholTolerance(data);
  };

  const handleInit = () => {
    location.reload();
  };

  return (
    <div className="w-full pb-12 scrollbar-hide max-w-[600px] h-screen overflow-y-auto flex flex-col items-center justify-start bg-neutral-900 text-neutral-100 p-6 space-y-8">
      <h1 className="text-2xl font-semibold">주량 계산기 🍻</h1>
      <p className="text-xl font-normal text-center">
        이 수치는 사용자 개인 맞춤형으로 주량을 예상한 결과입니다.
        <br /> 절대 정답이 될 수 없습니다. 지나친 음주는 금물입니다.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-6", "w-full")}
      >
        <FormField
          control={control}
          name="weight"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-neutral-300">몸무게(kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                  placeholder="자신의 몸무게를 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-neutral-500 text-sm mt-1">
                주량을 계산하기 위한 몸무게입니다.
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
          control={control}
          name="height"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-neutral-300">키(cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 focus:scale-102"
                  placeholder="자신의 키를 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-neutral-500 text-sm mt-1">
                주량을 계산하기 위한 키입니다.
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
          control={control}
          name="gender"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-neutral-300">성별</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value: Gender) => setValue("gender", value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-md">
                    <SelectValue placeholder="성별을 골라주세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border border-neutral-700">
                    <SelectItem value="MALE" className="text-neutral-100">
                      남성
                    </SelectItem>
                    <SelectItem value="FEMALE" className="text-neutral-100">
                      여성
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-neutral-500 text-sm mt-1">
                주량을 계산하기 위한 성별입니다.
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
          control={control}
          name="aldh2Mutation"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>ADHD 여부</FormLabel>
                <FormDescription>
                  ADHD가 있는 사람은 일반적으로 알코올 분해 능력이 떨어집니다.
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

        <FormField
          control={control}
          name="hasEaten"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>식사 여부</FormLabel>
                <FormDescription>
                  당신은 지금 식사를 한 상태인가요? 혹은 식사 중인가요?
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

        <Button
          id="target-element"
          type="submit"
          className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700"
        >
          계산하기
        </Button>
      </form>

      {alcoholTolerance && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold">
            당신이 섭취 가능한 알코올 용량: {alcoholTolerance.toFixed(2)}g
          </h2>
        </motion.div>
      )}
      {soju && (
        <motion.div
          className="mt-6 flex items-center gap-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            className="rounded-lg"
            src="/soju.png"
            width={64}
            height={64}
            alt="soju"
          />
          <h2 className="text-xl font-semibold">소주로 환산하면? {soju}잔</h2>
        </motion.div>
      )}
      {beer && (
        <motion.div
          className="mt-6 flex items-center gap-4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            className="rounded-lg"
            src="/beer.png"
            width={64}
            height={64}
            alt="beer"
          />
          <h2 className="text-xl font-semibold">맥주로 환산하면? {beer}캔</h2>
        </motion.div>
      )}
      {alcoholTolerance && (
        <motion.div
          className="w-full mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={handleInit}
          >
            초기화
          </Button>
        </motion.div>
      )}
      {alcoholTolerance && (
        <motion.div
          className="w-full mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => (window.location.href = "/alcohol/rank")}
          >
            🤔 내 주량은 상위 몇 %일까??
          </Button>
        </motion.div>
      )}

      {alcoholTolerance && (
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            🍻 술 한잔? 그럼 안주도 제대로 먹어야지!
          </p>
          <p className="text-lg text-gray-700 mb-4">
            지금 내 뱃속은?? <br />
            내가 먹은 음식의 비례 용적량을 계산하고, 소화가 언제 될지 예측하는
            서비스를 경험해 보세요. 🍴
          </p>
          <p className="text-md text-gray-600 mb-4">
            하.. 배부르긴 한데.. 지금 내 위 용량 대비 정확히 얼마나 먹은거지? 더
            먹고싶긴해..
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            onClick={() => (window.location.href = "/signup")}
          >
            지금 바로 내 뱃속 수치를 알아보세요!
          </Button>
          <p className="mt-4 text-sm text-red-600">현재 테스트 버전입니다.</p>
        </div>
      )}
    </div>
  );
};

export default AlcoholPage;
