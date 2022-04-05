/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componetMounted = true;

  useEffect(() => {
    const getProudects = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");

      if (componetMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componetMounted = false;
      };
    };
    getProudects();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProudect = (cat) => {
    const updatelist = data.filter((x) => x.category === cat);
    setFilter(updatelist);
  };
  const Showproudect = () => {
    return (
      <>
        <div className="buttons mb-5 pb-5 d-flex justify-content-center">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProudect("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProudect("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProudect("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProudect("electronics")}
          >
            Electronics
          </button>
        </div>
        {filter.map((proudect, index) => {
          return (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 text-center p-4">
                <img
                  src={proudect.image}
                  className="card-img-top"
                  alt={proudect.title}
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {proudect.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">$ {proudect.price}</p>
                  <NavLink to={`/products/${proudect.id}`} className="btn btn-outline-dark">
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">
              Latest Proudects
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <Showproudect />}
        </div>
      </div>
    </div>
  );
};

export default Products;
