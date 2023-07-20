import React, { useState } from "react";
import { Nav } from "react-bootstrap";


export default function NavLink(props) {
  const [isHover, setHover] = useState(false);

  function handleMouseEnter() {
    setHover(true);
  };
  function handleMouseLeave() {
    setHover(false);
  };

  const boxStyle = Object.assign({},
    {"opacity": isHover? "0.6": "1"},
    props.style
  );

  return (
    <div 
      style={boxStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Nav.Link href={props.link}>{props.name}</Nav.Link>
    </div>
  )
}