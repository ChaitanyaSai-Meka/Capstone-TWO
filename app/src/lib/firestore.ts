import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import app from './firebase';
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(app);

export interface UserData {
  uuid: string;
  email: string;
  username: string;
  password: string; // Note: In production, you should hash passwords
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
    const uuid = uuidv4();
    const userData: UserData = {
      uuid,
      email,
      username,
      password, // In production, hash this password
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store user data in Firestore with Firebase UID as document ID
    await setDoc(doc(db, 'users', firebaseUid), userData);
    
    console.log('User created in Firestore:', { uuid, email, username });
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
    // Note: This is a simple check. In production, you might want to create a separate collection
    // for usernames or use a different approach for better performance
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

// Favorites functionality
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
    console.log('Hotel added to favorites:', hotel.name);
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
    console.log('Hotel removed from favorites:', hotelId);
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const getUserFavorites = async (firebaseUid: string): Promise<FavoriteHotel[]> => {
  try {
    const favoritesRef = collection(db, 'users', firebaseUid, 'favorites');
    const q = query(favoritesRef, where('deleted', '!=', true));
    const querySnapshot = await getDocs(q);
    
    const favorites: FavoriteHotel[] = [];
    querySnapshot.forEach((doc) => {
      favorites.push(doc.data() as FavoriteHotel);
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