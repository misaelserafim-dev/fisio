"use server";
import { cookies } from "next/headers";

const deleteCookie = async () => {
  const ck = await cookies();
  ck.delete("skydiet:token");
};

export default deleteCookie;
