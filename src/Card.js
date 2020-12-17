import React from "react";

const Card = ({ title, category, onClickHandle }) => {
  return [
    <div onClick={() => onClickHandle()}>X</div>,
    <h3>{title}</h3>,
    <h3>{category}</h3>,
    <button>MOCK BUTTON</button>
  ];
};

export default Card;
