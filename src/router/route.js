import { useRoutes, Navigate } from "react-router-dom";
import Index from "../pages/index/index";
import FindMusic from "../pages/findMusic/index";
import PersonalFM from "../pages/personalFM/index";
import Video from "../pages/video/index";
import Recommand from "../pages/findMusic/recommand";
import Songlist from "../pages/findMusic/songlist";
import Rank from "../pages/findMusic/rank";
import Singer from "../pages/findMusic/singer";
import Newest from "../pages/findMusic/newest";
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
