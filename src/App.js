/** Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
/** React Router */
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import AddNewAuthor from './screens/AddNewAuthor';
import AddNewPost from './screens/AddNewPost';

import { useSubscription, useQuery, useLazyQuery } from '@apollo/client';
import { GET_AUTHORS, GET_ONE_AUTHOR } from './GraphQL/Authors/queries';
import { GET_POSTS } from './GraphQL/Posts/queries';
import { AUTH_ADMIN } from './GraphQL/Admin/queries';
import AuthorsPage from './screens/AuthorsPage';
import EditAuthor from './screens/EditAuthor';
import EditPost from './screens/EditPost';
import Login from './screens/Login';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './screens/AdminLogin';
import DashboardUser from './screens/DashboardUser';
import DetailArticle from './screens/DetailArticle';

function App() {

  const navigate = useNavigate();
  // const { loading, error, data } = useSubscription(GET_AUTHORS);
  // const { loading: postLoading, error: postError, data: postData } = useSubscription(GET_POSTS);
  // const [getOneAuthor, { data: oneAuthorData, refetch }] = useLazyQuery(GET_ONE_AUTHOR, {
  //   onCompleted(oneAuthorData) {
  //     if (oneAuthorData.authors.length === 0) {
  //     } else {
  //       // console.login(oneAuthorData.authors[0]);
  //       localStorage.setItem('token', JSON.stringify(oneAuthorData.authors[0]));
  //     }
  //     console.log("one authorrrr data", oneAuthorData);
  //     refetch();
  //   },
  //   onError(error) {
  //     console.log(error);
  //   }
  // });
  // const [authAdmin, { data: authAdminData }] = useLazyQuery(AUTH_ADMIN, {
  //   onCompleted(authAdminData) {
  //     if (authAdminData.admin.length === 0) {
  //       alert('Username or password is incorrect');
  //     } else {
  //       localStorage.setItem('token', JSON.stringify(authAdminData.admin[0]));
  //       navigate('/dashboard');
  //     }
  //     console.log("auth admin data", authAdminData);
  //   }
  // });


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sosial" element={<Home />} />
        <Route path="/politik" element={<Home />} />
        <Route path="/agama" element={<Home />} />
        <Route path="/budaya" element={<Home />} />
        <Route path="/detail/:id" element={<DetailArticle />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
        <Route path="/dashboard/authors/add-new-author" element={<AddNewAuthor />} />
        <Route path="/dashboard/authors/edit-author/:id" element={<EditAuthor />} />
        <Route path="/dashboard/add-new-post" element={<AddNewPost />} />
        <Route path="/dashboard-user/add-new-post" element={<AddNewPost />} />
        <Route path="/dashboard/edit-post/:id" element={<EditPost />} />
        <Route path="/dashboard-user/edit-post/:id" element={<EditPost />} />
        <Route path="/dashboard/authors" element={<AuthorsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
