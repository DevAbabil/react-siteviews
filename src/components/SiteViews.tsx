import { useIsLocal } from "@/hooks";
import { FC, ReactNode } from "react";

type SiteViewsProps = {
  projectName: string;
  children?: ReactNode;
  refresh?: string | number;
  visited?: () => void;
  getData?: (siteViewsFullData: any) => typeof siteViewsFullData;
  rootProps?: any;
  childProps?: any;
};

const SiteViews: FC<SiteViewsProps> = (props: SiteViewsProps) => {
  const {
    children,
    projectName,
    childProps,
    refresh,
    rootProps,
    getData,
    visited,
  } = props;

  const isLocal = useIsLocal();

  return <div>{children}</div>;
};

export default SiteViews;
