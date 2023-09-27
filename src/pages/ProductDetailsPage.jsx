import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const {products} = useSelector((state) => state.productSlice)
  const { allEvents } = useSelector((state) => state.eventSlice);
  const { name:id } = useParams();
  const [data, setData] = useState(null);
  // const productName = name.replace(/-/g, " ");
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");


  useEffect(() => {
    // const data =   productData.find((i) => i.name === productName);
    const data = products && products.find((i) => i?._id === id);
    setData(data);
  }, [products, id]);

  // useEffect(() => {
  //   if (eventData !== null) {
  //     const data = allEvents && allEvents.find((i) => i._id === id);
  //     setData(data);
  //   } else {
  //     const data = allProducts && allProducts.find((i) => i._id === id);
  //     setData(data);
  //   }
  // }, [allProducts, allEvents]);

  return (
    <div>
      <Header/>
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;


// {
//   !eventData && (
//     <>
//     {data && <SuggestedProduct data={data} />}
//     </>
//   )
// }