import { CheckSvg } from "./CheckSvg";

function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
}

export function Benefits({ items }) {
  return (
    <>
      <div className="list-box">
        {items.map((item) => (
          <span key={item.id} className="check-item">
            {" "}
            <CheckSvg /> {removeTags(item.name)}
          </span>
        ))}
      </div>
    </>
  );
}
