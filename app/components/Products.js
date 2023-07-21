"use client";
import { ProductService } from "@/services/ProductService";
import Plan from "./plan";
import { useEffect, useState } from "react";
import { PlanPlaceHolderLoader } from "./Placeholders/PlaceholderLoader";

export default function Products() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  async function getList() {
    try {
      setLoader(true);
      console.log("ProductService.addFilter(products)");
      let products = await ProductService.getList();
      if (hasPlans(products)) {
        products.data.electricity = ProductService.addFilter(
          products.data.electricity
        );
      }
      setLoader(false);
      setData(products);
    } catch (err) {
      setLoader(false);
      setData([]);
    }
  }

  useEffect(function () {
    getList();
  }, []);

  function hasPlans(plans) {
    return (
      plans &&
      plans.data &&
      plans.data.electricity &&
      plans.data.electricity.length
    );
  }

  if (loader) {
    return (
      <>
        <PlanPlaceHolderLoader />
        <PlanPlaceHolderLoader />
        <PlanPlaceHolderLoader />
      </>
    );
  }

  return (
    <>
      {hasPlans(data) &&
        data.data.electricity.map((plan) => <Plan key={plan.id} item={plan} />)}
      {!hasPlans(data) && (
        <div>
          No Data found... <button onClick={() => getList()}>Try Again</button>
        </div>
      )}
    </>
  );
}
