"use client";
import { Button, message, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { v4 as uniqueId } from "uuid";
import { storage, db } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { PreviewImage, ImagePicker } from "./components";
import { UploadImageParam } from "./types";
import { Unsubscribe } from "@firebase/util";

export default function Home(): React.JSX.Element {
  const [imageFile, setImageFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadImage = (param: UploadImageParam) => {
    const { imageFile, propertyTypeGroup, roomType } = param;
    if (imageFile) {
      const name = uniqueId();
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      let unsubscribe: Unsubscribe;

      unsubscribe = uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            parseFloat(
              Number(snapshot.bytesTransferred / snapshot.totalBytes).toFixed(0)
            ) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const docRef = addDoc(collection(db, "my-photos"), {
              propertyTypes: propertyTypeGroup,
              roomType: roomType,
              imageUrl: url,
            })
              .then((res) => {
                message.success("Image uploaded successfully.");
              })
              .catch((error) => message.error(error.message))
              .finally(() => {
                setImageFile(undefined);
              });
          });
          unsubscribe();
        }
      );
    } else {
      message.error("File not found");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="container mt-5">
          {imageFile ? (
            <>
              <PreviewImage
                image={imageFile}
                onUploadImage={handleUploadImage}
                onClose={() => setImageFile(undefined)}
              />
              {uploadProgress > 0 && <Progress percent={uploadProgress} />}
            </>
          ) : (
            <div className="flex align-middle content-center justify-center">
              <ImagePicker onChange={setImageFile} />
              <Button href="/my-photos" type="link" size="large">
                <label className="py-6 px-5 cursor-pointer border-2 border-blue-700 bg-blue-500 w-5 text-center text-white rounded-md align-top">
                  View Gallery
                </label>
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
