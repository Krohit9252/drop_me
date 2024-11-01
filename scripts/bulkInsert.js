import { db } from '../app/config/firebaseConfig'; // Update the path to your Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Removed unnecessary imports

const groceryCategories = [
    {
        "name": "Fruits",
        "imageUrl": "URL_TO_IMAGE_FOR_FRUITS", 
        "description": "Fresh and organic fruits from various regions."
    },
    {
        "name": "Vegetables",
        "imageUrl": "URL_TO_IMAGE_FOR_VEGETABLES", 
        "description": "Varieties of fresh and green vegetables."
    },
    {
        "name": "Dairy Products",
        "imageUrl": "URL_TO_IMAGE_FOR_DAIRY_PRODUCTS", 
        "description": "Milk, cheese, butter, and other dairy items."
    },
    {
        "name": "Rice & Pulses",
        "imageUrl": "URL_TO_IMAGE_FOR_RICE_AND_PULSES", 
        "description": "Different varieties of rice and pulses."
    },
    {
        "name": "Spices",
        "imageUrl": "URL_TO_IMAGE_FOR_SPICES", 
        "description": "A variety of spices to enhance your cooking."
    },
    {
        "name": "Flours & Grains",
        "imageUrl": "URL_TO_IMAGE_FOR_FLOURS_AND_GRAINS", 
        "description": "Different types of flours and grains."
    },
    {
        "name": "Oils & Ghee",
        "imageUrl": "URL_TO_IMAGE_FOR_OILS_AND_GHEE", 
        "description": "Cooking oils and clarified butter (ghee)."
    },
    {
        "name": "Snacks",
        "imageUrl": "URL_TO_IMAGE_FOR_SNACKS", 
        "description": "Tasty snacks for any time of the day."
    },
    {
        "name": "Beverages",
        "imageUrl": "URL_TO_IMAGE_FOR_BEVERAGES", 
        "description": "A range of drinks including juices, soft drinks, and more."
    },
    {
        "name": "Bakery Items",
        "imageUrl": "URL_TO_IMAGE_FOR_BAKERY_ITEMS", 
        "description": "Freshly baked bread, cakes, and pastries."
    },
    {
        "name": "Canned & Packaged Foods",
        "imageUrl": "URL_TO_IMAGE_FOR_CANNED_FOODS", 
        "description": "Canned and packaged foods for convenience."
    },
    {
        "name": "Frozen Foods",
        "imageUrl": "URL_TO_IMAGE_FOR_FROZEN_FOODS", 
        "description": "Frozen vegetables, meals, and snacks."
    },
    {
        "name": "Condiments & Sauces",
        "imageUrl": "URL_TO_IMAGE_FOR_CONDIMENTS", 
        "description": "Varieties of sauces and condiments for flavor."
    },
    {
        "name": "Health Foods",
        "imageUrl": "URL_TO_IMAGE_FOR_HEALTH_FOODS", 
        "description": "Nutrient-rich foods for a healthy lifestyle."
    },
    {
        "name": "Organic Foods",
        "imageUrl": "URL_TO_IMAGE_FOR_ORGANIC_FOODS", 
        "description": "Organic products grown without chemicals."
    }
];

const insertData = async () => {
    const categoriesRef = collection(db, "groceryCategories");
    const batch = writeBatch(db); // Create a batch

    groceryCategories.forEach((category) => {
        const docRef = doc(categoriesRef); // Create a new document reference
        batch.set(docRef, category); // Add the set operation to the batch
    });

    try {
        await batch.commit(); // Commit the batch
        console.log("All categories inserted successfully!");
    } catch (error) {
        console.error("Error inserting data: ", error);
    }
};

insertData();
