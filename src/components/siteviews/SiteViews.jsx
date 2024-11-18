import { useEffect, useRef, useReducer } from "react";

const intialState = {
  loading: true,
  count_vaue: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_COUNT": {
      return {
        ...state,
        loading: false,
        count_vaue: action.value,
      };
    }
  }
};

const SiteViews = ({
  projectName,
  visited,
  getData,
  refresh,
  placeHolder,
  ...rest
}) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const interValRef = useRef(null);

  useEffect(() => {
    const storage = sessionStorage,
      visitKey =
        "isVisit-o&+/N ,>vz )e8l[,JTg4^5P=wz5p>tp>h2y!nr^THT?,XN,*R%`$>~zFw,hJ-YY",
      visitValue =
        "yes-#J=(?HOFdTy!5?4`kQJ-z)-&X^[WH^km9Kij3+:|N!U]yvuNHwhw;R(DJKK0vn;h",
      isLocal = ["MTI3LjAuMC4x", "bG9jYWxob3N0"].includes(
        btoa(location.hostname)
      ),
      isVisit = storage.getItem(visitKey) === visitValue,
      API = "https://siteviews.vercel.app/api/count";

    isLocal
      ? (() => {
          console.warn(
            "To use 'SiteViews', Please Deploy your website at first."
          );
          console.warn("SiteViews Does not work in in Local Development");
        })()
      : null;

    if (!isLocal && !isVisit) {
      const svi = setTimeout(() => {
        const ipDetails = async () => {
            try {
              const data = await (
                  await fetch("https://json.geoiplookup.io")
                ).json(),
                tO = {};
              Object.entries(data).map(
                ([key, value]) => value && (() => (tO[key] = value))()
              );
              return tO;
            } catch (error) {
              console.warn("Faild to collect User Ip Details");
              return null;
            }
          },
          deviceInfo = {
            userDateTime: new Date().toLocaleString(),
            platform: navigator?.platform,
            deviceMemmory: navigator?.deviceMemory,
            browserCodeName: navigator?.appCodeName,
            browserLanguage: navigator?.language,
            browserOnline: navigator?.onLine,
            browserEngine: navigator?.product,
            version: navigator?.appVersion,
            screenWidth: screen?.width,
            screenHeight: screen?.height,
          };

        (async () => {
          try {
            const ipData = (await ipDetails()) ?? {};
            const result = await (
              await fetch(API, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    project: projectName,
                    hostname: location.hostname,
                    ...ipData,
                    ...deviceInfo,
                  },
                }),
              })
            ).json();

            if (result.status === 200 && result.success === true) {
              visited ? visited() : null;
              storage.setItem(visitKey, visitValue);
            }
          } catch (error) {
            console.warn(error.message);
          }
        })();
        clearTimeout(svi);
      }, 1500);
    }

    const getViewsCount = async () => {
      try {
        const { data } = await (
          await fetch(`${API}/${projectName}`, {
            method: "GET",
          })
        ).json();

        if (data) {
          dispatch({
            type: "GET_COUNT",
            value: data.count,
          });
        }
      } catch (error) {
        console.warn(error.message);
      }
    };

    if (!isLocal) {
      getViewsCount();

      const refreshTime = refresh
        ? (() => {
            const inputNumber = parseInt(refresh);
            if (!isNaN(inputNumber)) {
              if (inputNumber < 10) {
                console.warn(
                  "You have been trying to set refress value les thant 10, which is not allowed. minimum acceceptable refress value is 10"
                );
                return 10 * 1000;
              } else {
                return inputNumber * 1000;
              }
            }
            throw Error(`refresh props value Must be a integer.`);
          })()
        : null;

      if (refresh) {
        interValRef.current = setInterval(getViewsCount, refreshTime);
      }

      if (getData) {
        (async () => {
          try {
            const result = await (
              await fetch(`${API}/${projectName}?info=full`)
            ).json();
            if (result.status === 200 && result.success === true) {
              getData(result.data.details);
            }
          } catch (error) {
            console.log(error.message);
            getData({ message: "data retrivation faild!" });
          }
        })();
      }
    }

    return () => clearInterval(interValRef.current);
  }, [projectName, visited, getData, refresh, placeHolder]);

  return (
    <span {...rest}>
      {state.loading ? placeHolder ?? "" : state.count_vaue}
    </span>
  );
};

export default SiteViews;
