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
import SingerDetail from "../pages/singerDetail";
import Album from "../pages/singerDetail/album";
import MV from "../pages/singerDetail/MV";
import Detail from "../pages/singerDetail/detail";
import PlaylistDetail from "../pages/playlistDetail";
import Song from "../pages/playlistDetail/song";
import Comment from "../pages/playlistDetail/comment";
import MusicDetail from "../pages/musicDetail";
import AlbumDetail from "../pages/albumDetail";
import AlbumComment from "../pages/albumDetail/comment";
import AlbumInfo from "../pages/albumDetail/info";
import AlbumSong from "../pages/albumDetail/song";
import KeepAlive from "react-activation";
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
          element: (
            <KeepAlive id="1">
              <FindMusic />
            </KeepAlive>
          ),
          children: [
            {
              path: "/findMusic/recommand",
              element: (
                <KeepAlive id="2">
                  <Recommand />
                </KeepAlive>
              ),
            },
            {
              path: "/findMusic/songlist",
              element: (
                <KeepAlive id="3">
                  <Songlist />
                </KeepAlive>
              ),
            },
            {
              path: "/findMusic/rank",
              element: (
                <KeepAlive id="4">
                  <Rank />
                </KeepAlive>
              ),
            },
            {
              path: "/findMusic/singer",
              element: (
                <KeepAlive id="5">
                  <Singer />
                </KeepAlive>
              ),
            },
            {
              path: "/findMusic/newest",
              element: (
                <KeepAlive id="6">
                  <Newest />,
                </KeepAlive>
              ),
            },
          ],
        },
        {
          path: "/personalFM",
          element: (
            <KeepAlive id="7">
              <PersonalFM />
            </KeepAlive>
          ),
        },
        {
          path: "/video",
          element: (
            <KeepAlive id="8">
              <Video />
            </KeepAlive>
          ),
        },
        {
          path: "/singer",
          element: (
            <KeepAlive id="9">
              <SingerDetail />
            </KeepAlive>
          ),
          children: [
            {
              path: "/singer/album",
              element: (
                <KeepAlive id="10">
                  <Album />
                </KeepAlive>
              ),
            },
            {
              path: "/singer/MV",
              element: (
                <KeepAlive id="11">
                  <MV />
                </KeepAlive>
              ),
            },
            {
              path: "/singer/detail",
              element: (
                <KeepAlive id="12">
                  <Detail />
                </KeepAlive>
              ),
            },
          ],
        },
        {
          path: "/playlist",
          element: (
            <KeepAlive id="13">
              <PlaylistDetail />
            </KeepAlive>
          ),
          children: [
            {
              path: "/playlist/song",
              element: (
                <KeepAlive id="14">
                  <Song />
                </KeepAlive>
              ),
            },
            {
              path: "/playlist/comment",
              element: (
                <KeepAlive id="15">
                  <Comment />
                </KeepAlive>
              ),
            },
          ],
        },
        {
          path: "/albumDetail",
          element: (
            <KeepAlive id="16">
              <AlbumDetail />
            </KeepAlive>
          ),
          children: [
            {
              path: "/albumDetail/song",
              element: (
                <KeepAlive id="17">
                  <AlbumSong />
                </KeepAlive>
              ),
            },
            {
              path: "/albumDetail/comment",
              element: (
                <KeepAlive id="18">
                  <AlbumComment />
                </KeepAlive>
              ),
            },
            {
              path: "/albumDetail/info",
              element: (
                <KeepAlive id="19">
                  <AlbumInfo />
                </KeepAlive>
              ),
            },
          ],
        },
        {
          path: "/musicDetail",
          element: (
            <KeepAlive id="20">
              <MusicDetail />
            </KeepAlive>
          ),
        },
      ],
    },
  ]);
  return routes;
};
export default Routes;
