"use client"

const { useState } = require("react");

export const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
  
    function removeTags(str) {
      if ((str===null) || (str===''))
          return false;
      else
          str = str.toString();
    
      return str.replace( /(<([^>]+)>)/ig, '');
    }
    return (
      <p className="text">
        <span dangerouslySetInnerHTML={{__html: isReadMore ? removeTags(text).slice(0, 150) : text}}></span>
        {removeTags(text).length>150 && <span onClick={toggleReadMore} className="read-or-hide">
            
          {isReadMore ? "...Read more" : " Show less"}
        </span>}
      </p>
    );
  };