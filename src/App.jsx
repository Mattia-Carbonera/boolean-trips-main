import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import DetailsTripPage from "./pages/DetailsTripPage";
import AddTrip from "./pages/AddTrip";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={HomePage}></Route>
            <Route path="/new-trip" Component={AddTrip}></Route>
            <Route path="/new-contact" component={AddContact}></Route>
            {/* <Route path="/trips" Component={HomePage}></Route> */}
            <Route path="/details/:id" Component={DetailsTripPage}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
