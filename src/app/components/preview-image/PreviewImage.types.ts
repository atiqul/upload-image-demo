import { UploadImageParam } from "@/app/types";

export type PreviewImageProps = {
  image: File;
  onUploadImage: (uploadParam: UploadImageParam) => void;
  onClose: () => void;
};
