import axios from "axios";
import api from "../lib/axios";

export interface PresignedUrlResponse {
  presignedUrl: string;
  finalImageUrl: string;
  key: string;
}

export const getPresignedUrl = async (
  fileName: string,
  fileType: string
): Promise<PresignedUrlResponse> => {
  try {
    const response = await api.get("/s3/presigned-url", {
      params: {
        fileName,
        contentType: fileType,
      },
    });

    console.log("S3 presigned URL response:", response.data);

    if (!response.data.finalImageUrl) {
      throw new Error("No finalImageUrl in response");
    }

    return response.data;
  } catch (error) {
    console.error("Error getting presigned URL:", error);
    throw error;
  }
};

export const uploadToS3 = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};
