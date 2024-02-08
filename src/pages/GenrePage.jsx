import React from "react";
import { useParams } from "react-router-dom";

function GenrePage() {
  const { genre } = useParams();
  return <div style={{ color: "white" }}>{genre}</div>;
}

export default GenrePage;
