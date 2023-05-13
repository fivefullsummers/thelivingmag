import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import axios from "axios";
import * as crypto from "crypto";


interface IParams {
  cloudDeleteId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { cloudDeleteId } = params;

  const generateSHA1 =(data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};


  const cloudName = "dxoihgtdo";
  const timestamp = new Date().getTime();
  const apiKey = "852351653749729";
  const apiSecret = "Pr_SRBxcxWB9wFwRSbN4XdIUL8g";
  const signature = generateSHA1(generateSignature(cloudDeleteId as string, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  console.log("in delete");


  console.log(`cloudDeleteId is: ${cloudDeleteId}`);

  try {
    const response = await axios.post(url, {
      public_id: cloudDeleteId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp
    })
  } catch(err) {
    console.error(err);
  }

  if (!cloudDeleteId || typeof cloudDeleteId !== "string") {
    throw new Error("Invalid Id");
  }

  return NextResponse.json({ cloudDeleteId });

}