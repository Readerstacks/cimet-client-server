import { ProductService } from "@/services/ProductService";
import Plan from "../components/plan";

 
 
export default async function Home() {
  const data = await ProductService.getList();

  function hasPlans(plans) {
    return (
      plans &&
      plans.data &&
      plans.data.electricity &&
      plans.data.electricity.length
    );
  }

  return (
    <>
      <h1>Electricity Plans</h1>

      {hasPlans(data) &&
        data.data.electricity.map((plan) => <Plan key={plan.id} item={plan} />)}
      {!hasPlans(data) && <div>No Data found...</div>}
    </>
  );
}
