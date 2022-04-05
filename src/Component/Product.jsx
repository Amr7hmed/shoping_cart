/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action/index";

const Product = () => {
  const { id } = useParams();
  const [proudect, setProudect] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (proudect) => {dispatch(addCart(proudect));};

  useEffect(() => {
    const getProudect = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProudect(await response.json());
      setLoading(false);
    };
    getProudect();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const Showproudect = () => {
    return (
      <>
        <div className="col-md-6">
          <img src={proudect.image}  alt={proudect.title} height="400px" width="400px" />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{proudect.category}</h4>
          <h1 className="display-5">{proudect.title}</h1>
          <p className="lead fw-bolder">
            Rating {proudect.rating && proudect.rating.rate}
            <i className="fa fa-star"></i>
          </p>

          <h3 className="fw-bold my-4 display-6">$ {proudect.price}</h3>
          <p className="lead">{proudect.description}</p>

          <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(proudect)}>
            Add To Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark px-3 ms-2 py-2">
            Go To Cart
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <Showproudect />}
        </div>
      </div>
    </div>
  );
};

export default Product;
