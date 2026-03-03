import { FC } from "react";
import { getPath } from "@/utils/getPath";
import Link, { LinkProps } from "next/link";

export interface LinkDefaultProps extends Omit<React.ComponentProps<"a">, "href">, LinkProps {
  href: string;
}

const LinkDefault: FC<LinkDefaultProps> = ({ href, ...props }) => {
  return <Link href={`${getPath(href)}`} {...props} />;
};

export default LinkDefault;
