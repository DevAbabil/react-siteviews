import { useGetDeviceInfo, useGetIpInfo, useReqRes, useUtils } from "@/hooks";
import { Log, SITEVIEWS_API } from "@/shared";
import {
  CSSProperties,
  FC,
  HTMLAttributes,
  HTMLProps,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import slugify from "slugify";

type SiteViewsProps = {
  projectName: string;
  children?: ReactNode;
  refresh?: string | number;
  visited?: () => void;
  getData?: <T extends any[]>(siteViewsFullData: T) => void;
  className?: string;
  style: CSSProperties;
  suppressLogs?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const SiteViews: FC<SiteViewsProps> = (props: SiteViewsProps) => {
  let {
    projectName,
    children,
    refresh,
    getData,
    visited,
    suppressLogs,
    style,
    className,
    ...rest
  } = props;

  const log = new Log(suppressLogs);
  const { isLocal, isVisited } = useUtils();
  const deviceInfo = useGetDeviceInfo();
  const rs = useReqRes();
  const ipInfo = useGetIpInfo();

  const [count, setCount] = useState(0);

  if (isLocal) {
    log.warn(
      "To use 'SiteViews', Please Deploy your website at first. SiteViews Does not work in in Local Development"
    );
  }

  if (projectName) {
    projectName = slugify(projectName);
  } else {
    log.err("projectName props required with a project name");
  }

  if (refresh && isNaN(refresh as number)) {
    log.err(`The 'refresh' props value must be an integer value.`);
    refresh = 10;
  } else if (Number(refresh) < 10) {
    refresh = 10;
    log.warn(
      `You've set a refresh value less than 10, which is not allowed. The minimum acceptable refresh value is 10.`
    );
  }

  if (visited && typeof visited !== "function") {
    log.err(
      `visited props required a 'function'. but got '${typeof visited}'.`
    );
  }

  if (getData && typeof getData !== "function") {
    log.err(
      `visited props required a 'function'. but got '${typeof getData}'.`
    );
  }

  const init = useCallback(async () => {
    try {
      const combineInfo = {
        project: projectName,
        hostname: location.hostname,
        ...(await ipInfo()),
        ...deviceInfo,
      };

      const res = await fetch(SITEVIEWS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: combineInfo,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        log.warn(err?.message);
      } else {
        if (visited) visited();
      }
    } catch (error) {
      log.err(error);
    }
  }, []);

  const displayCount = useCallback(async () => {
    rs.setLoading();

    try {
      const res = await fetch(`${SITEVIEWS_API}/${projectName}`, {
        method: "GET",
      });

      if (res.ok) {
        let count = (await res.json())?.data?.count;
        if (count) {
          setCount(count);
        }
        rs.setSuccess({ message: "fetched visit cout" });
      } else {
        rs.setError({ message: "faild fetched visit cout" });
      }
    } catch (error) {
      log.err(error);
      rs.setError({ message: "faild fetched visit cout" });
    }
  }, []);

  const retriveUserInfo = useCallback(async () => {
    try {
      const res = await fetch(`${SITEVIEWS_API}/${projectName}?info=full`, {
        method: "GET",
      });

      if (res.ok) {
        let { data } = await res.json();
        if (getData) getData(data?.details);
      } else {
        log.warn("Faild to retrive user info");
      }
    } catch (error) {
      log.err(error);
    }
  }, []);

  useEffect(() => {
    let timer: number;

    if (!isVisited && !isLocal) {
      init();
    }

    if (!isLocal) {
      displayCount();

      if (refresh) {
        timer = window.setInterval(
          displayCount,
          ((refresh as number) || 10) * 1000
        );
      }

      if (getData) {
        retriveUserInfo();
      }
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={style} className={className} {...rest}>
      {isLocal && 0}
      {!isLocal &&
        ((rs.loading && !isVisited) || !Boolean(count) ? children : count)}
    </div>
  );
};

export default SiteViews;
