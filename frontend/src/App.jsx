import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";
import RecipesPage from "./pages/RecipesPage";
import ConfirmImagesPage from "./pages/ConfirmImagesPage"
import ConfirmIngredientsPage from "./pages/ConfirmIngredientsPage";
import PotentialRecipesPage from "./pages/PotentialRecipesPage";

function App() {
  return (
    <Router>
      <div className="pb-16 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<CameraPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
		      <Route path="/confirmimages" element={<ConfirmImagesPage />} />
		      <Route path="/confirmingredients" element={<ConfirmIngredientsPage/>}/>
          <Route path="/potentialrecipes" element={<PotentialRecipesPage/>}/>
		</Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
}

export default App;
