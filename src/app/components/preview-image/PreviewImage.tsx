import React, { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Image, Button } from "antd";
import { PropertyGroups, RoomType } from "..";
import { UploadImageParam } from "@/app/types";

type Props = {
  image: File;
  onUploadImage: (uploadParam: UploadImageParam) => void;
  onClose: () => void;
};

export default function PreviewImage(props: Props): React.JSX.Element {
  const { onUploadImage, image: imageFile, onClose } = props;
  const [propertyTypeGroup, setPropertyTypeGroup] = useState<string[]>([]);
  const [roomType, setRoomType] = useState<string>("");

  const handleOnClick = () => {
    onUploadImage({ roomType, propertyTypeGroup, imageFile });
  };

  return (
    <div>
      <div className="relative">
        <CloseCircleOutlined
          className="absolute top-2 right-2 z-10 fill-current text-gray-200 text-2xl"
          onClick={onClose}
        />
        <Image src={URL.createObjectURL(imageFile)} height={400} />
      </div>
      <div className="">
        <PropertyGroups onSelect={setPropertyTypeGroup} />
        <RoomType onSelect={setRoomType} />
      </div>
      <Button className="bg-blue-500" type="primary" onClick={handleOnClick}>
        Upload
      </Button>
    </div>
  );
}
