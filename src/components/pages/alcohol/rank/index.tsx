"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const RankPage = () => {
  const [alcoholTolerance, setAlcoholTolerance] = useState<number>(0);
  const [soju, setSoju] = useState<number>(0);
  const [beer, setBeer] = useState<number>(0);
  const { toast } = useToast();

  const calculatePercentile = (totalAlcohol: number) => {
    let percentile = 0;

    if (totalAlcohol <= 60) {
      percentile = Math.floor((totalAlcohol / 60) * 50);
    }
    // 60g ~ 80g 구간: 상위 50~70%
    else if (totalAlcohol <= 80) {
      percentile = 50 + Math.floor(((totalAlcohol - 60) / 20) * 20);
    }
    // 80g ~ 100g 구간: 상위 70~85%
    else if (totalAlcohol <= 100) {
      percentile = 70 + Math.floor(((totalAlcohol - 80) / 20) * 15);
    }
    // 100g ~ 130g 구간: 상위 85~95%
    else if (totalAlcohol <= 130) {
      percentile = 85 + Math.floor(((totalAlcohol - 100) / 30) * 10);
    }
    // 130g ~ 160g 구간: 상위 95~98%
    else if (totalAlcohol <= 160) {
      percentile = 95 + Math.floor(((totalAlcohol - 130) / 30) * 3);
    }
    // 160g 이상: 상위 98~100%
    else {
      percentile = 98 + Math.floor(((totalAlcohol - 160) / 40) * 2);
    }

    return setAlcoholTolerance(percentile);
  };

  const handleInit = () => {
    location.reload();
  };

  useEffect(() => {
    calculatePercentile(soju * 7 + beer * 10);
  }, [soju, beer]);

  return (
    <div className="w-full pb-12 scrollbar-hide max-w-[600px] h-screen overflow-y-auto flex flex-col items-center justify-start bg-neutral-900 text-neutral-100 p-6 space-y-8">
      <h1 className="text-2xl font-semibold">
        🏆 내 주량은 상위 몇 퍼센트일까?
      </h1>
      <p className="text-xl font-normal text-center text-red-600">
        지나친 음주는 건강을 악화시킵니다.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">
          {alcoholTolerance === 100
            ? "형님 제발 그만 드세요ㅜㅜ 😭"
            : alcoholTolerance > 0
            ? `현재 당신의 주량은 상위 ${(100 - alcoholTolerance).toFixed(2)}%!`
            : "먹은 술을 추가해서 내 수준을 확인해보세요!"}
        </h2>
      </div>

      <div className="flex w-full gap-4 justify-center">
        <div className="mt-6 flex items-center gap-4 flex-col">
          <Image
            className="rounded-lg"
            src="/soju.png"
            width={64}
            height={64}
            alt="soju"
          />
          <Button
            className="outline"
            onClick={() => setSoju((prev) => prev + 1)}
          >
            소주 + 1잔
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-4 flex-col">
          <Image
            className="rounded-lg"
            src="/beer.png"
            width={64}
            height={64}
            alt="beer"
          />
          <Button
            className="outline"
            onClick={() => setBeer((prev) => prev + 1)}
          >
            멕주 + 1캔
          </Button>
        </div>
      </div>
      {alcoholTolerance > 0 && (
        <Button
          className="w-full mt-4 bg-red-600 hover:bg-red-700"
          onClick={handleInit}
        >
          초기화
        </Button>
      )}

      {alcoholTolerance > 0 && (
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
            먹고싶긴해.. 곧 플레이스토어에도 출시된다고??
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

export default RankPage;
