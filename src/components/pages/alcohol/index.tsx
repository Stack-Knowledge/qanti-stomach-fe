"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

interface AlcoholFormData {
  weight: number;
  height: number; // 키 (cm)
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

  const calculateAlcoholTolerance = (data: AlcoholFormData) => {
    const weight = Number(data.weight);
    const height = Number(data.height);
    const hours = 24; // 24시간을 기준으로 설정
    const { gender, aldh2Mutation, hasEaten } = data;

    // 유효성 검사: weight와 height가 올바른 값인지 확인
    if (isNaN(weight) || isNaN(height) || height === 0) {
      setAlcoholTolerance(null);
      setSoju(null);
      setBeer(null);
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // 성별에 따른 기본 알콜 내성 비율 설정
    let baseRate = gender === "MALE" ? 0.68 : 0.55; // 남성, 여성 기본 비율
    if (aldh2Mutation) baseRate *= 0.8; // ALDH2 돌연변이 고려

    // 알콜 내성 계산 (kg 단위의 체중을 기준으로)
    let alcoholToleranceValue = (weight * baseRate * hours) / 10; // hours는 24시간으로 고정

    // 식사를 했으면 10% 감소
    if (hasEaten) alcoholToleranceValue *= 0.9;

    // 계산된 값이 비정상적인지 확인
    if (isNaN(alcoholToleranceValue) || alcoholToleranceValue <= 0) {
      setAlcoholTolerance(null);
      setSoju(null);
      setBeer(null);

      toast({
        title: "비정상적인 값이에요!!",
      });

      return;
    }

    // 알콜 내성 값 상태로 설정
    setAlcoholTolerance(alcoholToleranceValue);

    // 소주 1잔 = 7g 알콜, 맥주 1캔 = 10g 알콜 기준으로 계산
    const sojuTolerance = Math.ceil(alcoholToleranceValue / 7); // 올림 처리
    const beerTolerance = Math.ceil(alcoholToleranceValue / 15); // 올림 처리

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
          type="submit"
          className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700"
        >
          계산하기
        </Button>
      </form>

      {alcoholTolerance && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            당신이 섭취 가능한 알코올 용량: {alcoholTolerance.toFixed(2)}g
          </h2>
        </div>
      )}
      {soju && (
        <div className="mt-6 flex items-center gap-4">
          <Image
            className="rounded-lg"
            src="/soju.png"
            width={64}
            height={64}
            alt="soju"
          />
          <h2 className="text-xl font-semibold">소주로 환산하면? {soju}잔</h2>
        </div>
      )}
      {beer && (
        <div className="mt-6 flex items-center gap-4">
          <Image
            className="rounded-lg"
            src="/beer.png"
            width={64}
            height={64}
            alt="beer"
          />
          <h2 className="text-xl font-semibold">맥주로 환산하면? {beer}캔</h2>
        </div>
      )}
      {alcoholTolerance && (
        <Button
          className="w-full mt-4 bg-red-600 hover:bg-red-700"
          onClick={handleInit}
        >
          초기화
        </Button>
      )}
    </div>
  );
};

export default AlcoholPage;
