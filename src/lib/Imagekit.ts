// lib/imagekit.ts
import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/ewym4bqyz", // Replace with your ImageKit ID
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY ?? "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
});