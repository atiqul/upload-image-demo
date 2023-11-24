import { ROOM_TYPE_OPTIONS } from "@/app/constant";
import { Select } from "antd";
import React from "react";

const RoomType = (props: RoomTypeProps): React.JSX.Element => {
  const { onSelect } = props;
  return (
    <>
      <label className="text-sm">Select Property Group</label>
      <Select
        className="mt-2"
        style={{ width: "100%" }}
        placeholder="Select room type"
        onChange={onSelect}
        options={ROOM_TYPE_OPTIONS}
      />
    </>
  );
};

export default RoomType;
