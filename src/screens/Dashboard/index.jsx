import React, { useState, useEffect } from 'react';
/** React Router */
import { useNavigate } from 'react-router-dom';
/** Components */
import NaviBar from '../../components/NaviBar';
import Table from '../../components/Table';
/** Apollo client */
import { useQuery } from '@apollo/client';
/** GraphQL */
import { GET_POSTS, ADD_POST } from '../../GraphQL/Posts/queries';

const Dashboard = () => {

    const tHead = ['No', 'Judul', 'Penulis', 'Aksi'];

    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_POSTS);

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigate('/login');
        }
    }, []);

    const handleNewPostButton = () => {
        navigate('/dashboard/add-new-post');
    }

    return (
        <>
            <NaviBar />
            <div className='m-3'>
                <h1 className='mb-4'>Dashboard</h1>
                <button onClick={handleNewPostButton} className='btn bg_primary'>Add New Post</button>
                {
                    loading === false && data ? (
                        <div className='m-3'>
                            <Table data={data.blogs_posts} tHead={tHead} />
                        </div>
                    ) : (
                        // oneAuthorData !== undefined ? (
                        //     <div className='m-3'>
                        //         <Table oneAuthorData={oneAuthorData.authors} tHead={tHead} />
                        //     </div>
                        // ) : (
                        <h1>loading.....</h1>
                        // )
                    )
                }
            </div>
        </>
    );
}

export default Dashboard;
