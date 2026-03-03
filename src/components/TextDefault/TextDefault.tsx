import "./TextDefault.scss";
import { FC, ComponentProps } from "react";
type Prop = ComponentProps<"div"> & { text?: string };

const TextDefault: FC<Prop> = ({ text, children, ...props }) => {
  const value = (text || children || "") as string;

  return <div id="textDefault" dangerouslySetInnerHTML={{ __html: value?.trim() }} {...props} />;
};

export default TextDefault;
