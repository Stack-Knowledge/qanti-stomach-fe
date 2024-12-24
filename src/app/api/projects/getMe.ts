import { redirect } from "next/navigation";

import { usersUrl } from "@/api/libs";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export const getMe = async (): Promise<User | undefined> => {
  const token = cookies().get("token")?.value;

  if (!token) return redirect("/signup");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1${usersUrl.getMe()}`,
      {
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
