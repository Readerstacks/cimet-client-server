import { ProductService } from "@/services/ProductService";
import Products from "./components/Products";

export default async function Home() {
  return (
    <>
      <h1>Electricity Plans</h1>
      <Products />
    </>
  );
}
