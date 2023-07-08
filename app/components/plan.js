import Image from "next/image";
import { Benefits } from "./Benefits";
import { ReadMore } from "./ReadMore";
import { Tags } from "./Tags";

export default function Plan({ item }) {
  const benefitList = [
    {
      id: 1,
      name: item.view_benefit,
    },
    {
      id: 2,
      name: item.view_contract,
    },
    {
      id: 3,
      name: item.view_exit_fee,
    },
  ];

  // Plan UI
  return (
    <div className="plan" key={item.id}>
      <div className="tags">
        <Tags tags={item.plan_tags} />
      </div>
      <div className="display-flex space-arround align-center ">
        <div className="provider-info align-center display-flex dir-col lh2 mb10">
          <div className="provider-image">
            <Image
              alt={item.provider_name}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              src={item.provider_image}
            />
          </div>
          <div className="name">View Details</div>
          <div className="name">
            <a href={item.plan_document} target="_blank">
              Basic plan Information Document
            </a>
          </div>
        </div>
        <div className="mb10 width-220">
          <div className="less-then">
            <div>{item.dmo_percentage.Ausgrid} </div>
            <div>{item.plan_name_below_data}</div>
          </div>
          <Benefits items={benefitList} />
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
          <Benefits
            items={[
              {
                id: 1,
                name: item.cooling_off_period + " Cooling off",
              },
              {
                id: 2,
                name: "Secure signup in 5 mins",
              },
              {
                id: 3,
                name: "Save Time and Efforts",
              },
            ]}
          />
          <ReadMore text={item.terms_condition} />
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
