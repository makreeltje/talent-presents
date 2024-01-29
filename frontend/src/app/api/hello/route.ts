import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return new Response("hello", { status: 200 });
}

export async function GET(req: NextRequest) {
  const body = await req.json();

  return new Response(JSON.stringify({ name: "light 1", isActive: false }));
}

type RGBLight = {
  id: string;
  name: string;
  isActive: boolean;
  red: number;
  green: number;
  blue: number;
};

//* Ik kan mogelijk een poll request maken die luistert op een poort die ik aan kan passen met een input field in het settings menu 
//* 
//* 
//* 
