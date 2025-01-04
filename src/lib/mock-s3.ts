export interface PresignedUrlResponse {
  presignedUrl: string;
  finalImageUrl: string;
  key: string;
}

export const mockGetPresignedUrl = async (
  fileName: string,
  fileType: string
): Promise<PresignedUrlResponse> => {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      const key = `${Date.now()}-${fileName}`;
      console.log("Getting presigned URL...", { fileName, fileType, key });
      resolve();
    }, 1000)
  );

  const key = `${Date.now()}-${fileName}`;

  return {
    presignedUrl: `https://mock-s3.com/upload/${key}`,
    finalImageUrl: `https://mock-s3.com/${key}`,
    key,
  };
};

export const mockUploadToS3 = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      console.log("Uploading to S3...", { presignedUrl, fileName: file.name });
      resolve();
    }, 1000)
  );
};
