"use client";

import React, { useEffect, useState } from "react";
import { Stomach, categoryColors } from "@/types/stomach";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MainPageProps {
  user: User;
  stomachData: Stomach[];
}

const MainPage = ({ user, stomachData }: MainPageProps) => {
  const [open, setOpen] = useState(false);

  const { data: stomach, refetch } = useGetStomachById(user.id, {
    initialData: stomachData,
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!stomach || !user) return;

  const totalVolume = stomach.reduce((acc, food) => acc + food.volume, 0);
  const totalWeight = stomach.reduce((acc, food) => acc + food.weight, 0);
  const totalOccupancy = stomach.reduce((acc, food) => acc + food.ratio, 0);

  function getFeedback(): string {
    if (!user.stomachVolume) return "";
    if (totalOccupancy < 60) {
      return "It's a decent amount!";
    } else if (totalOccupancy >= 60 && totalOccupancy <= 85) {
      return "That's it. Stop eating.";
    } else {
      return "It's a risk of overeating!";
    }
  }

  return (
    <div className="w-full scrollbar-hide max-w-[600px] h-screen overflow-y-auto flex flex-col items-center justify-start bg-neutral-900 text-neutral-100 p-6 space-y-8">
      {/* 유저 정보 카드 */}
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-sm text-neutral-400">{user.age} years old</p>
        <p className="text-sm text-neutral-400">{user.gender}</p>
        <p className="text-sm text-neutral-400">Weight: {user.weight} kg</p>
        <p className="text-sm text-neutral-400">Height: {user.height} cm</p>
      </div>

      {/* Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="text-neutral-400" variant="outline">
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

      {stomach && (
        <>
          {isMobile ? (
            <div className="space-y-4">
              {[...stomach].reverse().map((food, index) => (
                <div
                  key={food.foodId}
                  className="p-4 bg-white shadow rounded-lg border"
                >
                  <h3
                    style={{ background: categoryColors[food.type] }}
                    className="text-xl font-semibold text-gray-900 opacity-50 w-fit"
                  >
                    {stomach.length - 1 - index}. {food.type}
                  </h3>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900">
                        Weight: {food.weight}(g)
                      </span>
                      <span className="text-gray-900">
                        Volume: {food.volume.toFixed(2)} cm³
                      </span>
                    </div>
                    <div className="mt-1 text-gray-900">
                      <span>Ratio: {food.ratio.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="min-h-fit">
              <Table>
                <TableCaption>Your stomach</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>INDEX</TableHead>
                    <TableHead>CATEGORY</TableHead>
                    <TableHead>WEIGHT</TableHead>
                    <TableHead>VOLUME</TableHead>
                    <TableHead>RATIO</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {[...stomach].reverse().map((food, index) => (
                    <TableRow key={food.foodId}>
                      <TableCell className="font-medium">
                        {stomach.length - 1 - index}
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{ background: categoryColors[food.type] }}
                        >
                          {food.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{food.weight}(g)</TableCell>
                      <TableCell>{food.volume.toFixed(2)}(cm3)</TableCell>
                      <TableCell>{food.ratio.toFixed(2)}(%)</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-neutral-100">Total</h2>
            <div className="space-y-4"></div>
            <div className="space-y-4"></div>
            <p className="text-gray-300">volume: {totalVolume.toFixed(2)} ml</p>
            <p className="text-gray-300"> weight: {totalWeight} g</p>
            <p className="text-gray-300">ratio: {totalOccupancy.toFixed(2)}%</p>
            <p className="text-gray-300 text-xl">{getFeedback()}</p>

            <p className="text-gray-600 ">
              This result is a prediction based on the users information.
            </p>
          </div>

          <Accordion type="single" className="w-full" collapsible>
            {stomach.map((food) => (
              <AccordionItem key={food.foodId} value={food.foodId}>
                <AccordionTrigger>{food.type}</AccordionTrigger>
                <AccordionContent>Weight: {food.weight}g</AccordionContent>
                <AccordionContent>Volume: {food.volume}</AccordionContent>
                <AccordionContent>Ratio: {food.ratio}</AccordionContent>
                <AccordionContent>
                  Time of intake : {new Date(food.createdAt).toLocaleString()}
                </AccordionContent>
                <AccordionContent>
                  Estimated time to digest :
                  {new Date(food.complete).toLocaleString()}
                </AccordionContent>
                {Math.max(
                  Math.floor(
                    (new Date(food.complete).getTime() - new Date().getTime()) /
                      (1000 * 60)
                  ),
                  0
                ) === 0 ? (
                  <AccordionContent className="text-red-500">
                    Completed!
                  </AccordionContent>
                ) : (
                  <AccordionContent className="text-red-500">
                    {Math.max(
                      Math.floor(
                        (new Date(food.complete).getTime() -
                          new Date().getTime()) /
                          (1000 * 60)
                      ),
                      0
                    )}
                    minutes left.
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
};

export default MainPage;
