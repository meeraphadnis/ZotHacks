import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RecipesPage } from "./pages/RecipesPage";
// import { RecipeSlideupPopup } from "./RecipeSlideupPopup"; // optional

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        {/* Optional route if you have RecipeSlideupPopup */}
        {/* <Route path="/recipe/:id" element={<RecipeSlideupPopup />} /> */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-[#e8deca] text-[#46503d]">
              <h1 className="text-4xl font-semibold mb-4">Page Not Found</h1>
              <Link
                to="/"
                className="text-lg underline hover:text-[#6b8e4e]"
              >
                Back to Recipes
              </Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
