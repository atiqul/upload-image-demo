import { PROPERTY_GROUP_OPTIONS } from "@/app/constant";
import { Select } from "antd";
import React from "react";

const PropertyGroups = (props: PropertyGroupTypeProps): React.JSX.Element => {
  const { onSelect } = props;

  return (
    <>
      <label className="text-sm">Select Property Group</label>
      <Select
        className="mt-2"
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Select peoperty group"
        onChange={onSelect}
        options={PROPERTY_GROUP_OPTIONS}
      />
    </>
  );
};

export default PropertyGroups;
