import { PROPERTY_GROUP_OPTIONS } from "@/app/constant";
import { Select } from "antd";
import React from "react";

type Props = {
  onSelect: (propertyGroups: string[]) => void;
};

const PropertyGroups = (props: Props) => {
  const { onSelect } = props;

  return (
    <div className="">
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Select peoperty group"
        onChange={onSelect}
        options={PROPERTY_GROUP_OPTIONS}
      />
    </div>
  );
};

export default PropertyGroups;
