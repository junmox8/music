import { useRoutes, Navigate } from "react-router-dom";
import { lazy } from "react";
import Index from "../pages/index/index";
import FindMusic from "../pages/findMusic/index";
import PersonalFM from "../pages/personalFM/index";
import Video from "../pages/video/index";
import Recommand from "../pages/findMusic/recommand";
import Songlist from "../pages/findMusic/songlist";
import Rank from "../pages/findMusic/rank";
import Singer from "../pages/findMusic/singer";
import Newest from "../pages/findMusic/newest";
// const Songlist = lazy(() => import("../pages/findMusic/songlist"));
// const Index = lazy(() => import("../pages/index/index"));
// const FindMusic = lazy(() => import("../pages/findMusic/index"));
// const PersonalFM = lazy(() => import("../pages/personalFM/index"));
// const Video = lazy(() => import("../pages/video/index"));
// const Recommand = lazy(() => import("../pages/findMusic/recommand"));
// const Rank = lazy(() => import("../pages/findMusic/rank"));
// const Singer = lazy(() => import("../pages/findMusic/singer"));
// const Newest = lazy(() => import("../pages/findMusic/newest"));

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Index />,
      children: [
        {
          path: "/findMusic",
          element: <FindMusic />,
          children: [
            {
              path: "/findMusic/recommand",
              element: <Recommand />,
            },
            {
              path: "/findMusic/songlist",
              element: <Songlist />,
            },
            {
              path: "/findMusic/rank",
              element: <Rank />,
            },
            {
              path: "/findMusic/singer",
              element: <Singer />,
            },
            {
              path: "/findMusic/newest",
              element: <Newest />,
            },
          ],
        },
        {
          path: "/personalFM",
          element: <PersonalFM />,
        },
        {
          path: "/video",
          element: <Video />,
        },
      ],
    },
  ]);
  return routes;
};
export default Routes;
