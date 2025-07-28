import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import app from './firebase';

const db = getFirestore(app);

export interface UserData {
  email: string;
  username: string;
  password: string; 
  createdAt: Date;
  updatedAt: Date;
}

export const createUserInFirestore = async (
  email: string, 
  username: string, 
  password: string,
  firebaseUid: string
): Promise<void> => {
  try {
    const userData: UserData = {
      email,
      username,
      password, // In production, hash this password
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store user data in Firestore with Firebase UID as document ID
    await setDoc(doc(db, 'users', firebaseUid), userData);
    

  } catch (error) {
    console.error('Error creating user in Firestore:', error);
    throw error;
  }
};

export const getUserFromFirestore = async (firebaseUid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', firebaseUid));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    throw error;
  }
};

export const updateUserInFirestore = async (
  firebaseUid: string, 
  updates: Partial<UserData>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', firebaseUid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user in Firestore:', error);
    throw error;
  }
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  try {
    const usersRef = doc(db, 'usernames', username);
    const userDoc = await getDoc(usersRef);
    return userDoc.exists();
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
};

export const reserveUsername = async (username: string, firebaseUid: string): Promise<void> => {
  try {
    await setDoc(doc(db, 'usernames', username), {
      firebaseUid,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error reserving username:', error);
    throw error;
  }
};


export interface FavoriteHotel {
  hotelId: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  location: string;
  addedAt: Date;
}

export const addToFavorites = async (firebaseUid: string, hotel: FavoriteHotel): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', firebaseUid, 'favorites', hotel.hotelId), {
      ...hotel,
      addedAt: new Date()
    });

  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (firebaseUid: string, hotelId: string): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', firebaseUid, 'favorites', hotelId), {
      deleted: true,
      deletedAt: new Date()
    });

  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const getUserFavorites = async (firebaseUid: string): Promise<FavoriteHotel[]> => {
  try {
    const favoritesRef = collection(db, 'users', firebaseUid, 'favorites');
    const querySnapshot = await getDocs(favoritesRef);
    
    const favorites: FavoriteHotel[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.deleted) {
        favorites.push(data as FavoriteHotel);
      }
    });
    
    return favorites;
  } catch (error) {
    console.error('Error getting user favorites:', error);
    return [];
  }
};

export const isHotelFavorited = async (firebaseUid: string, hotelId: string): Promise<boolean> => {
  try {
    const favoriteDoc = await getDoc(doc(db, 'users', firebaseUid, 'favorites', hotelId));
    return favoriteDoc.exists() && !favoriteDoc.data()?.deleted;
  } catch (error) {
    console.error('Error checking if hotel is favorited:', error);
    return false;
  }
}; 