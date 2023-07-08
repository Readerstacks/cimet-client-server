import Image from "next/image";
import { ReadMore } from "./ReadMore";

export default function Plan({ item }) {
  // Plan UI
  return (
    <div className="plan" key={item.id}>
      <div className="tags">
        <PlanTags tags={item.plan_tags} />
      </div>
      <div className="display-flex space-arround align-center ">
        <div className="provider-info align-center display-flex dir-col lh2 mb10">
          <Image
            width={80}
            alt="Provider image"
            height={60}
            src={item.provider_image}
          />
          <div className="name">View Details</div>
          <div className="name">
            <a href={item.plan_document} target="_blank">
              Basic plan Information Document
            </a>
          </div>
        </div>
        <div className="mb10">
          <div className="less-then">
            <div>{item.dmo_percentage.Ausgrid} </div>
            <div>{item.plan_name_below_data}</div>
          </div>
          <Benefits item={item} />
          <SolarTerif solar={item.solar_rates} />
        </div>
        <div className="mb10">
          <PriceComponent
            yearlyPrice={item.expected_annually_bill_amount}
            monthlyPrice={item.expected_monthly_bill_amount}
          />
        </div>
      </div>

      <div
        className="features"
        dangerouslySetInnerHTML={{ __html: item.features }}
      ></div>
      <div className="plan-footer">
        <div className="terms_condition">
          <ReadMore children={item.terms_condition} />
        </div>

        <div className="actions">
          <button className="btn btn-buy" type="button">
            Connect Online Today
          </button>
        </div>
      </div>
    </div>
  );
}

function Benefits({ item }) {
  // ['contract_length','view_contract','view_exit_fee']
  return (
    <>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: item.view_benefit }}></li>
        <li dangerouslySetInnerHTML={{ __html: item.view_exit_fee }}></li>
        <li dangerouslySetInnerHTML={{ __html: item.view_contract }}></li>
        <li dangerouslySetInnerHTML={{ __html: item.contract_length }}></li>
      </ul>
    </>
  );
}

function PlanTags({ tags }) {
  if (tags.length > 0) {
    return (
      <>
        {tags.map((tag) => (
          <div className="tag">{tag.tags?.name}</div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}

function SolarTerif({ solar }) {
  const terrif = solar && solar[0] ? solar[0] : false;
  if (terrif) {
    return (
      <div className="standard-terif">
        {terrif.solar_description} : {terrif.solar_price}
      </div>
    );
  } else {
    return <></>;
  }
}

function PriceComponent({ yearlyPrice, monthlyPrice }) {
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
      </div>
    </div>
  );
}
