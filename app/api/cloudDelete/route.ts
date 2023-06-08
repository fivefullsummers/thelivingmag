import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";
import axios from "axios";
import * as crypto from "crypto";

export async function POST(request: Request, response: Response) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const { cloudDeleteId } = body;

  console.log("cloud id: ", cloudDeleteId);

  if (!cloudDeleteId || typeof cloudDeleteId !== "string") {
    throw new Error("Invalid Id");
  }

  const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const timestamp = new Date().getTime();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const signature = generateSHA1(
    generateSignature(cloudDeleteId as string, apiSecret as string)
  );
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  const maxRetries = 3;
  let retryCount = 0;

  const makeRequest = async () => {
    try {
      await axios.post(url, {
        public_id: cloudDeleteId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      });
      response.ok;
    } catch (error) {
      if (response.status === 401) {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying request attempt ${retryCount}`);
          await makeRequest();
        } else {
          console.log("Max retries reached. Request failed.");
        }
      }
      console.error(`${response.status} on ${cloudDeleteId}`);
    }
  };
  await makeRequest();

  return NextResponse.json({ cloudDeleteId });
}
