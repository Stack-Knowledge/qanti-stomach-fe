import { redirect } from "next/navigation";

import { stomachUrl } from "@/api/libs";
import { cookies } from "next/headers";
import { Stomach } from "@/types/stomach";

export const getMyStomach = async (): Promise<Stomach[] | undefined> => {
  const token = cookies().get("token")?.value;

  if (!token) return redirect("/signup");

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/v1${stomachUrl.getStomachById()}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 401) redirect("/signup");

    return res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
