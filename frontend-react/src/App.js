import { Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProduit from './components/CreateProduit';
import ListProduits from './components/ListProduits';
import NavProduit from './components/NavProduit';
import UpdateProduit from "./components/UpdateProduit";

function App() {
  return (
    <div className="App">
      <NavProduit/>
      <Routes>
        <Route path="/produit" element={<CreateProduit />} />
        <Route path="/produits" element={<ListProduits />} />
        <Route path="/produit/:id" element={<UpdateProduit />} />
      </Routes>
    </div>
  );
}

export default App;
