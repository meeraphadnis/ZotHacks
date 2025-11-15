# Grubbify

Grubbify is an AI-powered cooking assistant that helps college students reduce food waste by making better use of the groceries they already have.

## Introduction

Nothing's worse than watching good food spoil in your fridge because you don’t know what to cook. Grubbify was built to help students sustainably use what they have, save money, and minimize food waste.


Grubbify is an AI-powered cooking assistant focused on helping college students minimize food waste and maximize their grocery usage. Awarded First Place at ZotHacks 2025, Grubbify combines modern AI and web technologies for a seamless meal-planning experience.

The app enables users to snap or upload ingredient photos, which are processed in real time with Google Gemini through Python wrappers. This system identifies ingredients, tracks their quantities and expiration dates, and generates relevant recipes based on what is available. Meal planning is further streamlined with integrated camera and calendar features on the frontend.

Technologically, Grubbify’s frontend is built with React and Vite, providing fast rendering and a responsive interface. For backend services, FastAPI (Python) handles asynchronous HTTP APIs, connecting the frontend to intelligent modules like Gemini for image and recipe analysis. Ingredient and recipe data is managed with a local JSON-based database, making data updates quick and reliable while keeping storage lightweight.

This stack allowed rapid prototyping and scaling during the hackathon. React’s component model and hooks supported features like photo capture and calendar scheduling, while FastAPI provided secure and efficient endpoints for communication between the client and AI workflows. Gemini enabled robust ingredient recognition and dynamic recipe generation, and JSON data storage made it easy to add or update ingredient and meal data.

Recognition at ZotHacks 2025 highlights the technical and collaborative success of Grubbify. Future improvements include nutrition tracking, user authentication, collaborative fridge management for roommates, and expanded multi-user ingredient history.

Devpost Submission: https://devpost.com/software/wastenot-6mkxqs

📈 What’s Next
- Adding nutritional info (carbs, protein, etc.)
- User login and collaborative “Fridge” access for roommates
- Expanded ingredient tracking across users
