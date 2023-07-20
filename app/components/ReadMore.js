"use client";

import { SanitizeHTML } from "./SanitizeHTML";

const { useState } = require("react");

export const ReadMore = ({ text }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }
  return (
    <p className="text">
      <SanitizeHTML html={isReadMore ? removeTags(text).slice(0, 150) : text} />
      {removeTags(text).length > 150 && (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...Read more" : " Show less"}
        </span>
      )}
    </p>
  );
};
