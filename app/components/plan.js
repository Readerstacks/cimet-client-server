import Image from "next/image";

export default function Plan({ item }) {
  // Plan UI
  return (
    <div className="plan" key={item.id}>
      <div className="display-flex space-arround align-center">
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
      <div className="plan-footer">
        <div
          className="terms_condition"
          dangerouslySetInnerHTML={{ __html: item.terms_condition }}
        ></div>

        <div className="actions">
          <button className="btn btn-buy" type="button">
            Connect Online Today
          </button>
        </div>
      </div>
    </div>
  );
}

function PriceComponent() {
  return (
    <div className="price-box">
      <div className="price-bx-header">Estimated Cost</div>
      <div className="price-bx-body">
        <div className="year-price">
          $986 <span>/yr</span>
        </div>
        <div className="month-price">
          $87 <span>/mo</span>
        </div>
      </div>
    </div>
  );
}
