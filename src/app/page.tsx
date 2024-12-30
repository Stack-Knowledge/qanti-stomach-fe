import MainPage from "@/components/pages/main";
import { getMe } from "./api";
import { getMyStomach } from "./api/stomach";
import { redirect } from "next/navigation";

export default async function Home() {
  const userInfo = await getMe();
  if (!userInfo?.id && userInfo?.id !== 0) redirect("/signup");
  const initialStomach = await getMyStomach();

  console.log(initialStomach);

  return <MainPage user={userInfo} stomachData={initialStomach ?? []} />;
}
