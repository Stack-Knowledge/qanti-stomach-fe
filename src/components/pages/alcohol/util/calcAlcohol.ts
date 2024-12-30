interface AlcoholToleranceParams {
  weight: number; // 체중 (kg)
  gender: "MALE" | "FEMALE"; // 성별
  fatPercentage: number; // 체지방률 (0 ~ 1 범위)
  aldh2Mutation?: boolean; // ALDH2 유전자 변이 여부 (기본값은 false)
  hasEaten?: boolean; // 식사 여부 (기본값은 false)
}

const HOURS = 24;

const calculateAlcoholTolerance = (params: AlcoholToleranceParams): number => {
  // 기본 보정 계수 설정
  let baseRate = params.gender === "MALE" ? 0.1 : 0.08; // 남성: 0.1, 여성: 0.08
  if (params.aldh2Mutation) baseRate *= 0.8; // ALDH2 유전자 변이 시 20% 감소

  // 체지방률에 따라 체수분 비율 계산 (체수분 비율은 보통 체지방 비율에 반비례)
  const waterPercentage = 1 - params.fatPercentage; // 예시: 체수분 비율 (체지방률에 반비례)

  // 대사 가능한 알코올 양 계산
  const alcoholTolerance = params.weight * baseRate * HOURS * waterPercentage;

  // 식사 여부에 따른 조정 (식사 후에는 대사 속도가 느려짐)
  if (params.hasEaten) {
    return alcoholTolerance * 0.9; // 식사 후에는 10% 감소
  }

  return alcoholTolerance;
};

const convertToDrinks = (alcoholTolerance: number) => {
  const beerAlcohol = 20; // 500ml 맥주 1캔에 들어있는 알코올 양 (g)
  const sojuAlcohol = 72; // 360ml 소주 1병에 들어있는 알코올 양 (g)

  // 맥주 잔 수와 소주 병 수 계산
  const beerGlasses = Math.ceil(alcoholTolerance / beerAlcohol); // 올림
  const sojuBottles = Math.ceil(alcoholTolerance / sojuAlcohol); // 올림

  return {
    beerGlasses,
    sojuBottles,
  };
};

// 예시: 70kg, 남성, 체지방률 25%, 4시간, ALDH2 유전자 변이 없음, 식사 후 음주
const alcoholTolerance = calculateAlcoholTolerance({
  weight: 70,
  gender: "MALE",
  fatPercentage: 0.25,
  aldh2Mutation: false,
  hasEaten: true,
});

// 맥주 잔 수와 소주 병 수 변환
const drinks = convertToDrinks(alcoholTolerance);

console.log(`대사 가능한 알코올 양: ${alcoholTolerance.toFixed(2)}g`);
console.log(`대사 가능한 맥주 잔 수: ${drinks.beerGlasses}잔`);
console.log(`대사 가능한 소주 병 수: ${drinks.sojuBottles}병`);
