import "./H1Hidden.scss";
import { FC } from "react";

const H1Hidden: FC<{ data: any }> = ({ data }) => {
  if (!data) return;
  return <h1 id="h1Hidden">{data}</h1>;
};

export default H1Hidden;
