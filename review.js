// Select the form and the review list container
const reviewForm = document.getElementById('review-form');
const reviewList = document.getElementById('review-list');

// Add an event listener to handle form submissions
reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the input values
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && message) {
        // Create a new review element
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `<strong>${name}:</strong> <p>${message}</p>`;

        // Add the review to the review list
        reviewList.appendChild(reviewItem);

        // Clear the form
        reviewForm.reset();
    }
});
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// Import Firebase and initialize it
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML element references
const reviewForm = document.getElementById('review-form');
const reviewList = document.getElementById('review-list');

// Fetch and display reviews from Firebase
async function fetchReviews() {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    reviewList.innerHTML = ""; // Clear existing reviews
    querySnapshot.forEach((doc) => {
        const review = doc.data();
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <strong>${review.name}:</strong>
            <p>${review.message}</p>
        `;
        reviewList.appendChild(reviewItem);
    });
}

// Fetch reviews on page load
fetchReviews();

// Handle review form submission
reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && message) {
        // Save review to Firebase
        await addDoc(collection(db, "reviews"), {
            name,
            message
        });

        // Reset form and reload reviews
        reviewForm.reset();
        fetchReviews();
    }
});
