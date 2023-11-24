"use client";
import { and, collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { Checkbox, Image, Radio, RadioChangeEvent, Spin, message } from "antd";
import { PROPERTY_GROUP_OPTIONS, ROOM_TYPE_OPTIONS } from "../constant";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { getMyPhotosDataFromStore } from "@/app/utils";
import { ImagePicker } from "../components";

const MyPhotos = (): React.JSX.Element => {
  const [photoData, setPhotoData] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string[]>([]);
  const [roomType, setRoomType] = useState("");
  const [loading, setLoading] = useState(true);

  const dbRef = collection(db, "my-photos/");

  const handleOnChange = async (checkedValues: CheckboxValueType[]) => {
    setSelectedProperty(checkedValues as string[]);
    const queryRef = await getQueryRef(roomType, checkedValues as string[]);
    getData(queryRef);
  };

  const onRoomTypeChange = async ({ target: { value } }: RadioChangeEvent) => {
    setRoomType(value);
    const queryRef = await getQueryRef(value, selectedProperty);
    getData(queryRef);
  };

  const getData = (queryRef: any) => {
    setLoading(true);
    getMyPhotosDataFromStore(queryRef)
      .then((data) => {
        setPhotoData(data);
      })
      .catch((error) => message.error(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const getQueryRef = async (roomType: string, selectedProperty: string[]) => {
    return !roomType && selectedProperty.length == 0
      ? dbRef
      : query(
          dbRef,
          and(
            roomType
              ? where("roomType", "==", roomType)
              : where("roomType", "!=", ""),
            selectedProperty.length > 0
              ? where("propertyTypes", "array-contains-any", selectedProperty)
              : where("propertyTypes", "!=", null)
          )
        );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyPhotosDataFromStore(dbRef);
      setPhotoData(data);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="lg:container lg:mx-auto px-4 border-2 h-full shadow-md">
      {loading && (
        <>
          <Spin
            size="large"
            spinning={true}
            className="flex items-center justify-center fixed h-full w-full z-10 bg-black bg-opacity-50 left-0"
          ></Spin>
          <div className="flex items-center justify-center fixed w-full h-full z-10 pt-20 left-0 text-blue-200">
            Loading...
          </div>
        </>
      )}
      <div className="flex flex-row">
        <div className="flex-none flex flex-col border-2 h-screen my-5 w-60">
          <div className="border-bottom-2 flex-none border-top-2 border-white-500 py-2 pl-2 mb-2 bg-gray-400 text-white">
            Group By
          </div>
          <div className="flex-auto pl-2">
            <Checkbox.Group
              className="flex flex-col"
              options={PROPERTY_GROUP_OPTIONS}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="flex-auto flex flex-grow flex-col overflow-auto my-5">
          <div className="flex container mx-auto pb-3 px-3">
            <Radio.Group defaultValue="" onChange={onRoomTypeChange}>
              <Radio.Button value="">All</Radio.Button>
              {ROOM_TYPE_OPTIONS.map((roomType, index) => {
                return (
                  <Radio.Button key={index} value={roomType.value}>
                    {roomType.label}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
          <div className="flex justify-start flex-wrap ml-3">
            {photoData.map((data) => (
              <div
                className="flex-none m-1 sm:w-full md:w-72 lg:w-80 border-2 shadow-md object-fill"
                key={data.id}
              >
                <Image src={data.imageUrl} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPhotos;
