import CoursePage from "../../../pages/CoursePage/CoursePage"
import HomePage from "../../../pages/HomePage/HomePage"
import MessangerPage from "../../../pages/MessangerPage/MessangerPage"

export const publicPaths = {
  HOMEPAGE: "/",
  COURSE: "/course",
  MESSANGER: "/messanger",
  //   APPLICATION: "/conference/:id/application",
  //   APPLICATION_EDIT: "/conference/:id/applications/:id",
  //   ERROR: '/404',
}

export const publicRoutes = [
  { path: publicPaths.HOMEPAGE, element: <HomePage /> },
  { path: publicPaths.COURSE, element: <CoursePage /> },
  { path: publicPaths.MESSANGER, element: <MessangerPage /> },
  //   { path: publicPaths.APPLICATION, element: <ApplicationPage/> },
  //   { path: publicPaths.APPLICATION_EDIT, element: <ApplicationEditPage/> },
]