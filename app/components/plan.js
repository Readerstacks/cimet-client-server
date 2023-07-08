import Image from "next/image";

export default function Plan({ item }) {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="plan" key={item.id}>
      <div class="display-flex space-arround align-center">
        <div>
          <Image
            width={100}
            alt="Provider image"
            height={100}
            src={item.provider_image}
          />
          <div className="name">{item.plan_name}</div>
        </div>
        <div>
          <PriceComponent></PriceComponent>
        </div>
      </div>

      <div
        className="features"
        dangerouslySetInnerHTML={{ __html: item.features }}
      ></div>
      <div class="plan-footer">
        <div
          className="terms_condition"
          dangerouslySetInnerHTML={{ __html: item.terms_condition }}
        ></div>

        <div class="actions">
          <button class="btn btn-buy" type="button">
            Connect Online Today
          </button>
        </div>
      </div>
    </div>
  );
}

function PriceComponent() {
  return (
    <div class="price-box">
      <div class="price-bx-header">Estimated Cost</div>
      <div class="price-bx-body">
        <div class="year-price">
          $986 <span>/yr</span>
        </div>
        <div class="month-price">
          $87 <span>/mo</span>
        </div>
      </div>
    </div>
  );
}
