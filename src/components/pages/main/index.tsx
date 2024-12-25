"use client";

import React, { useState } from "react";
import {
  Stomach,
  foodCategoryDensity,
  getFoodCategoryColor,
} from "@/types/stomach";
import { User } from "@/types/user";
import useGetStomachById from "@/api/hooks/stomach/useGetStomachById";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddFood from "./AddFood";

interface MainPageProps {
  user: User;
  stomachData: Stomach[];
}

const MainPage = ({ user, stomachData }: MainPageProps) => {
  const [foodLogs, setFoodLogs] = useState<Stomach[]>(stomachData);

  const [open, setOpen] = useState(false);

  const { data: stomach, refetch } = useGetStomachById(user.id, {
    initialData: stomachData,
  });

  const calculateStomachHeight = (food: Stomach) => {
    return food.volume * foodCategoryDensity[food.type];
  };

  return (
    <div className="w-full max-w-[600px] flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-neutral-100 p-4">
      {/* 유저 정보 카드 */}
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-sm text-neutral-400">{user.age} years old</p>
        <p className="text-sm text-neutral-400">{user.gender}</p>
        <p className="text-sm text-neutral-400">Weight: {user.weight} kg</p>
        <p className="text-sm text-neutral-400">Height: {user.height} cm</p>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="text-neutral-400 mb-4" variant="outline">
            Add food to Stomach
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-neutral-900">
              Add food to Stomach
            </DrawerTitle>
            <DrawerDescription className="text-neutral-400">
              Please add information about the food you ate
            </DrawerDescription>
          </DrawerHeader>
          <AddFood
            refetch={refetch}
            setOpen={setOpen}
            userId={user.id}
            className="px-4"
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button className="text-neutral-700" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* 위 상태 시각화 */}
      <div className="relative w-full max-w-md bg-gray-700 rounded-lg h-80">
        {/* 위 상태 백그라운드 */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg overflow-hidden">
          {foodLogs.map((food, index) => (
            <div
              key={food.foodId}
              className="absolute bottom-0 w-full"
              style={{
                height: `${calculateStomachHeight(food)}%`,
                backgroundColor: getFoodCategoryColor(food.type),
              }}
            >
              <div className="text-center text-xs font-bold text-neutral-100">
                {food.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 먹은 음식 로그 리스트 */}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Food Log</h2>
        <div className="space-y-4">
          {foodLogs.map((food, index) => (
            <div
              key={food.foodId}
              className="bg-neutral-800 p-4 rounded-lg shadow-md"
            >
              <p className="text-sm text-neutral-400">{food.type}</p>
              <p className="text-sm text-neutral-400">Weight: {food.weight}g</p>
              <p className="text-sm text-neutral-400">Volume: {food.volume}</p>
              <p className="text-sm text-neutral-400">Ratio: {food.ratio}</p>
              <p className="text-xs text-neutral-500">
                {new Date(food.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
