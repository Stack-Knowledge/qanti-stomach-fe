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

export const categoryColors: { [key: string]: string } = {
  "밥/곡물류": "#F59E0B", // bg-yellow-500
  "면/파스타류": "#EC4899", // bg-pink-500
  "빵/베이커리류": "#FB923C", // bg-orange-500
  고기류: "#EF4444", // bg-red-500
  해산물류: "#3B82F6", // bg-blue-500
  "채소/샐러드류": "#10B981", // bg-green-500
  과일류: "#8B5CF6", // bg-purple-500
  "스프/국류": "#14B8A6", // bg-teal-500
  음료: "#06B6D4", // bg-cyan-500
  "스낵/간식류": "#F9A8D4", // bg-pink-300
  튀김류: "#FCD34D", // bg-yellow-300
  디저트류: "#D8B4FE", // bg-purple-300
  유제품: "#D1D5DB", // bg-gray-400
};
