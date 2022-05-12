import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import NaviBar from '../../components/NaviBar';
/** React Router */
import { useNavigate } from 'react-router-dom';
/** Apollo client */
import { useQuery, useSubscription } from '@apollo/client';
/** GraphQL */
import { GET_AUTHORS } from '../../GraphQL/Users/queries';

const AuthorsPage = () => {

    const { loading, error, data, refetch } = useQuery(GET_AUTHORS);

    const navigate = useNavigate();

    const tHead = ['No', 'Nama', 'Aksi'];

    const handleNewAuthorButton = () => {
        navigate('/dashboard/authors/add-new-author');
    }

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <NaviBar />
            <div className='m-3'>
                <h1 className='mb-4'>Authors Page</h1>
                <button onClick={handleNewAuthorButton} className='btn bg_primary'>Add New Author</button>
                {
                    loading === false && data ? (
                        <div className='m-3'>
                            <Table data={data.blogs_users} tHead={tHead} />
                        </div>
                    ) : (
                        <h2>Loading.....</h2>
                    )
                }
            </div>
        </>
    );
}

export default AuthorsPage;
