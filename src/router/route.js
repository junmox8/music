import { useRoutes, Navigate } from "react-router-dom";
import Index from "../pages/index/index";
import FindMusic from "../pages/findMusic/index";
import PersonalFM from "../pages/personalFM/index";
import Video from "../pages/video/index";
const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Index />,
      children: [
        {
          path: "/findMusic",
          element: <FindMusic />,
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
