import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebase";

const usersCollectionRef = collection(db, "users");

/**
 * @function
 * @param {string} query
 * @returns {string} capitalized query
 */

export const capitalizeInput = (query) => {
  const queryArray = query.split(" ");

  const capitalizedArr = queryArray.map(
    (query) => query.charAt(0).toUpperCase() + query.slice(1)
  );
  return capitalizedArr.join(" ");
};

/**
 * @function
 * @param {array} products
 * @returns {array | null} with certain properties
 */

export const mapProducts = (products) => {
  if (!products) {
    return null;
  }

  return products.map((product) => {
    const { title, tags, body_html, id, image, product_type } = product;
    return {
      title,
      tags,
      body_html,
      id,
      image: image.src,
      type: product_type,
    };
  });
};

/**
 * @function
 * @param {array} products
 * @returns {array | null} with certain properties
 */
export const getTodosFirebase = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createTodosFirebase = async (newName, newAge) => {
  const data = await addDoc(usersCollectionRef, {
    name: newName,
    age: Number(newAge),
    isStudent: Boolean(true),
  });
  return data.id;
};

export const updateTodosFirebase = async (id, name) => {
  const userDoc = doc(db, "users", id); // getting simple spesific user doc
  const newFields = { name: name };
  return await updateDoc(userDoc, newFields);
};

export const deleteTodosFirebase = async (id) => {
  const userDoc = doc(db, "users", id);
  return await deleteDoc(userDoc);
};

export const asyncToaster = (
  promise,
  {
    loading = "Loading",
    success = "Got the data",
    error = "Error when fetching",
  }
) => {
  toast.promise(promise, {
    loading,
    success,
    error,
  });
};
