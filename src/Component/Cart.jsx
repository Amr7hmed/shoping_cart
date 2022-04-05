import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, deletCart } from "../redux/action/index";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);

  const Cartempity = () => {
    return (
      <div className="row py-5">
        <div className="col-12  text-center">
          <h4 className="lead fw-bolder">Cart Empity ...</h4>
        </div>
      </div>
    );
  };

  const Showitem = (cartitem) => {
    const dispatch = useDispatch();

    const increase = (proudect) => {
      dispatch(addCart(proudect));
    };

    const decrease = (proudect) => {
      dispatch(deletCart(proudect));
    };

    let Totlepriceitem = cartitem.qty * cartitem.price;

    return (
      <div key={cartitem.id} className="row py-5">
        <div className="col-md-6">
          <img
            src={cartitem.image}
            alt={cartitem.title}
            height="200px"
            width="200px"
          />
        </div>
        <div className="col-md-6">
          <h3 className="lead fw-bolder mb-4">{cartitem.title}</h3>
          <h3 className="lead fw-bolder mb-2">
            {cartitem.qty} <span className="text-danger">X</span> {cartitem.price} $ = 
           <span className="text-danger"> {Totlepriceitem.toFixed(2)} $</span>
          </h3>
          <div className="buttons">
            <button className="btn btn-outline-dark ms-2 lead fw-bolder"
              onClick={() => decrease(cartitem)}>
              -
            </button>
            <button className="btn btn-outline-dark ms-2 lead fw-bolder"
              onClick={() => increase(cartitem)}>
              +
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Checkout = (props) => {
    const { state } = props;
    const newstate = [];

    state.forEach((element) => {newstate.push(element.qty, element.price)});

    let Totleprice = newstate.reduce(function (previousValue, currentValue){return previousValue * currentValue});

    return (
      <div className="row py-5">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <p style={{ margin: 0 }} className="lead fw-bolder">
            Totle : <span className="text-danger"> {Totleprice.toFixed(2)} $ </span>
          </p>
        </div>
        <button className="col-6 btn btn-outline-dark lead fw-bolder">
          Checkout
        </button>
      </div>
    );
  };
  return (
    <div className="container">
      <div>{state.length === 0 ? <Cartempity /> : state.map(Showitem)}</div>
      <div>{state.length === 0 ? null : <Checkout state={state} />}</div>
    </div>
  );
};

export default Cart;
