import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection, query) => {
  const products = ref(null);
  const error = ref(null);
  // const jobFilter = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt", "desc");

  if (query) {
    collectionRef = collectionRef.where(...query);
  }

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
        // console.log("1doc", doc.data());
      });
      products.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      products.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, products };
};

export default getCollection;
