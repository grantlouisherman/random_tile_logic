import React, { useState } from "react";
import "./styles.css";
import data from "./data.json";
import Card from "./Card";
import {
  getEnrollableBenefits,
  getStaticBenefits,
  randomSort,
  swap
} from "./utils";

export default function App() {
  const {
    cardProduct: {
      productLayout: { filters },
      benefitsOrderList
    },
    benefits
  } = data;

  const enrollableBenefits = randomSort(
    getEnrollableBenefits(filters.Enroll, benefits)
  );
  const staticBenefits = randomSort(
    getStaticBenefits(benefitsOrderList, filters.Enroll, filters)
  );
  const [allTiles, setAllTiles] = useState(
    enrollableBenefits.concat(staticBenefits)
  );
  const [currentTiles, setCurrentTiles] = useState([allTiles[0], allTiles[1]]);
  const [isExhausted, setIsExhausted] = useState(false);
  const setTiles = (idx) => {
    if (
      !allTiles.length ||
      (allTiles[0] === undefined && allTiles[1] === undefined)
    ) {
      setIsExhausted(true);
    }
    if (allTiles.length === 1 || allTiles.includes(undefined)) {
      setCurrentTiles([
        allTiles[0],
        { benefit: "Exhausted", category: "Exhausted" }
      ]);
    }

    if (allTiles.length >= 2) {
      const newTiles = currentTiles;
      // move old item to 2 position and then remove that
      const newState = allTiles;
      swap(idx, newState);
      newState.splice(2, 1);

      setAllTiles(newState);
      newTiles[idx] = newState[idx];
      if (newTiles.includes(undefined)) {
        newTiles[newTiles.indexOf(undefined)] = {
          benefit: "Exhausted",
          category: "Exhausted"
        };
      }
      // TODO need better soloution to exhausted state
      if (allTiles[0] === undefined && allTiles[1] === undefined) {
        setIsExhausted(true);
      }
      setCurrentTiles([...newTiles]);
    }
  };
  if (isExhausted) {
    return <div> No More Tiles </div>;
  }
  return (
    <div className="App">
      <Card
        key={0}
        title={currentTiles[0].category}
        category={currentTiles[0].benefit}
        onClickHandle={() => setTiles(0)}
      />
      <hr />
      <Card
        key={1}
        title={currentTiles[1].benefit}
        category={currentTiles[1].category}
        onClickHandle={() => setTiles(1)}
      />
    </div>
  );
}
