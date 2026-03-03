import "./TagPost.scss";
import React from "react";

interface PropsTagPost {
  title: string;
}

export const TagPost = ({ title }: PropsTagPost) => {
  return (
    <div className="tagPost">
      <span className="tagPost__tag">{title}</span>
    </div>
  );
};
