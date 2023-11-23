import { ROOM_TYPE_OPTIONS } from "@/app/constant";
import { Select } from "antd";
import React from "react";

type Props = {
  onSelect: (roomType: string) => void;
};

const RoomType = (props: Props) => {
  const { onSelect } = props;
  return (
    <div className="">
      <Select
        style={{ width: "100%" }}
        placeholder="Select room type"
        onChange={onSelect}
        options={ROOM_TYPE_OPTIONS}
      />
    </div>
  );
};

export default RoomType;
