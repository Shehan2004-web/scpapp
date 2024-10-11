document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const toolCategories = document.querySelectorAll('.tools-category');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            toolCategories.forEach(categoryElement => {
                if (categoryElement.classList.contains(category)) {
                    categoryElement.style.display = 'block';
                } else {
                    categoryElement.style.display = 'none';
                }
            });
        });
    });

    // Show the first category by default
    if (toolCategories.length > 0) {
        toolCategories[0].style.display = 'block';
    }
});




// Included in HTML as <script> tag
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyALB7U-dxzYfyk6FKXzx3FQMY1fcGSYGLQ",
  authDomain: "scptools-2a891.firebaseapp.com",
  projectId: "scptools-2a891",
  storageBucket: "scptools-2a891.appspot.com",
  messagingSenderId: "1056684322006",
  appId: "1:1056684322006:web:52193770572ef3a3b8ad77",
  measurementId: "G-54LKRYY810"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function sendMessage(name, email, message) {
  try {
    await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
      timestamp: new Date()
    });
    alert('Message sent successfully!');
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Failed to send message. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    sendMessage(name, email, message);
  });
});



