import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import { element } from 'prop-types';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
//user
const Blogs=Loadable(lazy(() => import('pages/blogs/blog')));
const PostBlog=Loadable(lazy(() => import('pages/blogs/blog-post')));
const EditBlog=Loadable(lazy(() => import('pages/blogs/edit-post')));
//user List
const UserGrid=Loadable(lazy(() => import('pages/userGrid/userView')));

const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));

const loginCheck = JSON.parse(localStorage.getItem('loginStatus'));

if(!loginCheck){
 <AuthLogin />
}

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/', 
  element: loginCheck ? <Dashboard /> : <AuthLogin />,
  children: [
    {
      path: '/home',
      element: <DashboardDefault />
    },
    {
      path: 'blogs',
      element: <Blogs />
    },
    {
      path:'admin/blog/blog-post',
      element:<PostBlog />
    },
    {
      path:'admin/blog/edit-blog/:id',
      element:<EditBlog />
    },
    {
      path: 'user',
      element: <UserGrid />
    }
  ]
};

export default MainRoutes;
