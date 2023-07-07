import Image from "next/image";

 
 
export default function Plan({item}) {
  // You can add any UI inside Loading, including a Skeleton.
  return  <div className="plan" key={item.id}>
        <Image width={100} alt='Provider image' height={100} src={item.provider_image} />
          <div className="name" >{item.plan_name}</div>


          Features :
          <div className="features" dangerouslySetInnerHTML={{__html: item.features}}>

          </div>
  
          Terms & Condition :
          <div className="terms_condition" dangerouslySetInnerHTML={{__html: item.terms_condition}} ></div>

      
  </div>
}
