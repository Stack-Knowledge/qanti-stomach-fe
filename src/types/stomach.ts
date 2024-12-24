export interface CreateStomachDto {
  type: FoodCategory;
  weight: number;
}

export type FoodCategory =
  | "밥/곡물류"
  | "면/파스타류"
  | "빵/베이커리류"
  | "고기류"
  | "해산물류"
  | "채소/샐러드류"
  | "과일류"
  | "스프/국류"
  | "음료"
  | "스낵/간식류"
  | "튀김류"
  | "디저트류"
  | "유제품";

export type FoodCategoryDensityMap = {
  [key in FoodCategory]: number;
};

export const foodCategoryDensity: FoodCategoryDensityMap = {
  "밥/곡물류": 1.3,
  "면/파스타류": 0.9,
  "빵/베이커리류": 0.5,
  고기류: 1.1,
  해산물류: 1.2,
  "채소/샐러드류": 0.6,
  과일류: 0.8,
  "스프/국류": 1.0,
  음료: 1.0,
  "스낵/간식류": 0.4,
  튀김류: 0.7,
  디저트류: 0.6,
  유제품: 1.0,
};

export interface Stomach {
  userId: number;
  type: FoodCategory;
  weight: number;
  volume: number;
  ratio: number;
  createdAt: Date;
  complete: Date;
  foodId: string;
}

export const getFoodCategoryColor = (category: string) => {
  switch (category) {
    case "밥/곡물류":
      return "bg-yellow-500";
    case "면/파스타류":
      return "bg-pink-500";
    case "빵/베이커리류":
      return "bg-orange-500";
    case "고기류":
      return "bg-red-500";
    case "해산물류":
      return "bg-blue-500";
    case "채소/샐러드류":
      return "bg-green-500";
    case "과일류":
      return "bg-purple-500";
    case "스프/국류":
      return "bg-teal-500";
    case "음료":
      return "bg-cyan-500";
    case "스낵/간식류":
      return "bg-pink-300";
    case "튀김류":
      return "bg-yellow-300";
    case "디저트류":
      return "bg-purple-300";
    case "유제품":
      return "bg-gray-400";
    default:
      return "bg-gray-500";
  }
};
