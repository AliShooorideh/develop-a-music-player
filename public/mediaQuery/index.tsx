import { useMediaQuery } from "react-responsive";

export const MediaQuery = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 984px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 984px)" });
  return {
    isDesktopOrLaptop,
    isTabletOrMobile
  };
};
