import { NextResponse } from "next/server";

import getCurrentUser from "../../actions/getCurrentUser";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  return NextResponse.json({ currentUser});

}