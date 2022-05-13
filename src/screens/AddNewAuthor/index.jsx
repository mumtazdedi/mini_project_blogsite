import React, { useState, useEffect } from 'react';
/** Components */
import Form from '../../components/Form';
/** React Router */
import { useNavigate, useLocation } from 'react-router-dom';
/** Apollo client */
import { useMutation, useQuery, useSubscription } from '@apollo/client';
/** GraphQL */
import { GET_USERS, ADD_USER, GET_AUTHORS } from '../../GraphQL/Users/queries';

const AddNewAuthor = () => {

    const { loading, error, data } = useQuery(GET_USERS);

    const [addAuthor] = useMutation(ADD_USER, {
        refetchQueries: [{ query: GET_AUTHORS }]
    });

    const navigate = useNavigate();

    const location = useLocation();

    const [inputs, setInputs] = useState([
        {
            label: 'Nama',
            type: 'text',
            value: ''
        },
        {
            label: 'Author Pic',
            type: 'hidden',
            value: ''
        },
        {
            label: 'Role',
            type: 'hidden',
            value: ''
        },
        {
            label: 'Username',
            type: 'text',
            value: ''
        },
        {
            label: 'Password',
            type: 'password',
            value: ''
        }
    ]);

    useEffect(() => {
        setInputs([
            {
                label: 'Nama',
                type: 'text',
                value: ''
            },
            {
                label: 'Author Pic',
                type: 'hidden',
                value: ''
            },
            {
                label: 'Role',
                type: 'hidden',
                value: 'author'
            },
            {
                label: 'Username',
                type: 'text',
                value: ''
            },
            {
                label: 'Password',
                type: 'password',
                value: ''
            }
        ])
    }, []);


    useEffect(() => {
        if (location.pathname === '/dashboard/authors/add-new-author') {
            if (localStorage.getItem('user') === null) {
                navigate('/login');
            } else if (JSON.parse(localStorage.getItem('user')).role !== 'user') {
                navigate('/dashboard-user');
            }
        }
    }, []);

    const [isFormPost, setIsFormPost] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const addNewAuthor = (NewAuthor) => {
        addAuthor({
            variables: {
                nama: NewAuthor.nama,
                profile_pic: NewAuthor.profile_pic,
                role: NewAuthor.role,
                username: NewAuthor.username,
                password: NewAuthor.password
            }
        })

        console.log(NewAuthor);
        if (location.pathname === '/dashboard/authors/add-new-author') {
            navigate('/dashboard/authors');
        } else if (location.pathname === '/register') {
            navigate('/login');
        }

    }

    return (
        <div className='m-3'>
            {
                location.pathname === '/register' ? (
                    <h1 className='m-3'>Register akun penulis</h1>
                ) : (
                    <h1 className='m-3'>Tambah Penulis Baru</h1>
                )
            }
            <div className='p-3 bg_primary rounded text-light'>
                <Form addNewAuthor={addNewAuthor} isFormPost={isFormPost} isEdit={isEdit} inputs={inputs} setInputs={setInputs} />
            </div>
        </div>
    );
}

export default AddNewAuthor;
