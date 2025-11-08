import React from "react";
import { Link } from "react-router-dom";

import dish1 from "../assets/dish1.jpg";
import dish2 from "../assets/dish2.jpg";
import dish3 from "../assets/dish3.jpg";

export const Recipes = () => {
  const recipes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      calories: 590,
      cookTime: "30 min",
      image: dish1,
      description: "Creamy Italian pasta with bacon and parmesan cheese.",
    },
    {
      id: 2,
      name: "Chicken Stir Fry",
      calories: 480,
      cookTime: "25 min",
      image: dish2,
      description: "Tender chicken with colorful veggies and savory sauce.",
    },
    {
      id: 3,
      name: "Avocado Toast Deluxe",
      calories: 320,
      cookTime: "10 min",
      image: dish3,
      description: "Crispy toast topped with smashed avocado and poached egg.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#e8deca] py-10 px-6">
      <h1 className="text-4xl font-semibold text-[#46503d] mb-8 text-center [font-family:'Marcellus-Regular',Helvetica]">
        Recipes
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 justify-items-center">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-[#9cb87a] rounded-2xl shadow-md overflow-hidden border border-black w-full max-w-sm block cursor-pointer no-underline"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-64 md:h-72 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-2xl text-white mb-2 [font-family:'Marcellus-Regular',Helvetica]">
                {recipe.name}
              </h2>
              <p className="text-white text-sm mb-1">Calories: {recipe.calories}</p>
              <p className="text-white text-sm mb-3">Cook Time: {recipe.cookTime}</p>
              <p className="text-white text-sm mb-4">{recipe.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
