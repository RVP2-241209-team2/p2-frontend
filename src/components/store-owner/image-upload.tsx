import { X, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { getPresignedUrl, uploadToS3 } from "../../utils/s3";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    try {
      setIsUploading(true);

      const presignedData = await getPresignedUrl(file.name, file.type);

      if (!presignedData.finalImageUrl) {
        throw new Error("No final image URL received");
      }

      await uploadToS3(presignedData.presignedUrl, file);

      onChange([...images, presignedData.finalImageUrl]);
      toast.success("Image uploaded successfully!");

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (urlToRemove: string) => {
    onChange(images.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Existing Images */}
        {images.map((url, index) => (
          <div key={index} className="relative group aspect-square">
            <img
              src={url}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md transition-opacity"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        {images.length < maxImages && (
          <div className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-500">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-full bg-gray-100">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">Add Image</span>
                </div>
              )}
            </label>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500">
        {images.length} of {maxImages} images uploaded
      </p>
    </div>
  );
}
