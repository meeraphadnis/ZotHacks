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
    description: `Honey Dijon Salmon is a flavorful and elegant dish that perfectly balances sweetness and tanginess. The salmon fillets are coated in a luscious glaze made from honey, Dijon mustard, garlic, and a touch of lemon juice, which caramelizes beautifully as it bakes.
    This combination enhances the natural richness of the salmon, creating a tender, flaky texture with a golden, glossy finish. Fresh herbs such as parsley or dill can be sprinkled on top to add a burst of color and freshness, making it as visually appealing as it is delicious.`,
    instructions: `1. Preheat your oven to 400°F (200°C).
2. In a small bowl, whisk together honey, Dijon mustard, minced garlic, olive oil, and lemon juice.
3. Place the salmon fillets on a parchment-lined baking sheet.
4. Brush the honey-Dijon mixture evenly over the top of each fillet.
5. Bake for 12–15 minutes, or until the salmon flakes easily with a fork.
6. Garnish with fresh parsley or dill and serve with roasted vegetables or quinoa.`
  },
  {
    id: 2,
    name: "Classic Burger",
    calories: 500,
    cookTime: "30 min",
    image: dish2,
    description: "Juicy beef burger with cheese and lettuce.",
    instructions: `1. Shape ground beef into patties and season with salt and pepper.
2. Grill or pan-fry over medium heat for 4–5 minutes per side.
3. Add cheese slices during the last minute to melt.
4. Toast burger buns, then assemble with lettuce, tomato, and condiments of choice.`
  },
  {
    id: 3,
    name: "Classic Pizza",
    calories: 700,
    cookTime: "45 min",
    image: dish3,
    description: "Cheesy pizza with tomato sauce and toppings.",
    instructions: `1. Preheat oven to 475°F (245°C).
2. Roll out pizza dough on a floured surface.
3. Spread tomato sauce evenly over the base.
4. Sprinkle mozzarella cheese and add toppings of your choice.
5. Bake for 12–15 minutes or until crust is golden brown.
6. Slice and serve hot.`
  },
];


  return (
  <div
  style={{
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#e8deca",
    padding: "2.5rem 1.5rem",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // centers all child content horizontally
  }}
>
  <div className="w-full flex justify-center mb-8">
    <h1
  style={{
    fontSize: "2.5rem",       // text-4xl equivalent
    fontWeight: "600",        // font-semibold
    color: "#46503d",
    fontFamily: "'Marcellus-Regular'",
    textAlign: "center",      // centers horizontally
    marginBottom: "2rem",     // spacing below
  }}
>
  Recipes
</h1>

  </div>

  <div className="max-w-6xl mx-auto">
    <Recipes recipes={recipes} />
  </div>
</div>
  );
};