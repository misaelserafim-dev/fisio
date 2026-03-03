import "./Breadcrumb.scss";
import { FC, Fragment } from "react";
import { BreadcrumbType } from "@/@types/breadcrumb";
import Link from "next/link";

type BreadcrumbProps = BreadcrumbType[];

const BreadCrumb: FC<{ data: BreadcrumbProps }> = ({ data }) => {
  return (
    <div className="breadCrumb">
      <Link className="breadCrumb__link" href={`/`}>
        Home
      </Link>
      {data?.length > 0 &&
        data?.map((link: any, i: number) => (
          <Fragment key={i + "breadCrumb"}>
            <span className="breadCrumb__separator">{">"}</span>
            {link?.name && (
              <Link className="breadCrumb__link" href={link?.url} title={link?.name}>
                {link?.name}
              </Link>
            )}
          </Fragment>
        ))}
    </div>
  );
};
export default BreadCrumb;
