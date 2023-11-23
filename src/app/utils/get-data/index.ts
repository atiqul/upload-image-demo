import { getDocs } from "firebase/firestore";

const getMyPhotosDataFromStore = async (queryRef: any) => {
  const snapshot = await getDocs(queryRef);

  const data: any[] = [];
  if (!snapshot.empty) {
    snapshot.forEach((doc: any) => {
      data.push({ id: doc.id, ...doc.data() });
    });
  }

  return data;
};

export default getMyPhotosDataFromStore;
