export function PriceComponent({ yearlyPrice, monthlyPrice, billingOptions }) {
  return (
    <div className="price-box">
      <div className="price-bx-header">Estimated Cost</div>
      <div className="price-bx-body">
        <div className="year-price">
          ${yearlyPrice} <span>/yr</span>
        </div>
        <div className="month-price">
          ${monthlyPrice} <span>/mo</span>
        </div>
        {billingOptions}
      </div>
    </div>
  );
}
