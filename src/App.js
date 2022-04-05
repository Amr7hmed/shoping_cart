import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import { Switch, Route } from "react-router-dom";
import Products from "./Component/Products";
import Product from "./Component/Product";
import Cart from "./Component/Cart";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart}/>
      </Switch>
    </>
  );
}

export default App;
