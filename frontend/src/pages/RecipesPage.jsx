// src/pages/RecipesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import dish1 from "../assets/dish1.jpg";
import dish2 from "../assets/dish2.jpg";
import dish3 from "../assets/dish3.jpg";
import { Recipes } from "../components/Recipes";

export const RecipesPage = () => {
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      name: "Honey Dijon Salmon",
      calories: 450,
      cookTime: "45 min",
      image: dish1,
      description: "Delicious honey mustard glazed salmon.",
    },
    {
      id: 2,
      name: "Classic Burger",
      calories: 500,
      cookTime: "30 min",
      image: dish2,
      description: "Juicy beef burger with cheese and lettuce.",
    },
    {
      id: 3,
      name: "Classic Pizza",
      calories: 700,
      cookTime: "45 min",
      image: dish3,
      description: "Cheesy pizza with tomato sauce and toppings.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#e8deca] py-10 px-6">
      <h1 className="text-4xl font-semibold text-[#46503d] mb-8 text-center [font-family:'Marcellus-Regular',Helvetica]">
        Recipes
      </h1>

      <div className="max-w-[260px]-6xl mx-auto">
        <Recipes recipes={recipes} />
      </div>
    </div>
  );
};
