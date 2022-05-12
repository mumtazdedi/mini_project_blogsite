import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';
/** React Router */
import { useNavigate } from 'react-router-dom';
/** Apollo client */
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
/** GraphQL */
import { GET_ONE_USER, GET_AUTHORS } from '../../GraphQL/Users/queries';
/** Sweetalert2 */
import Swal from 'sweetalert2';

const Login = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const [getOneUser, { data, loading, error }] = useLazyQuery(GET_ONE_USER, {
        onCompleted: (userData) => {
            if (userData.blogs_users.length > 0) {
                localStorage.setItem('user', JSON.stringify(userData.blogs_users[0]));
                console.log(JSON.parse(localStorage.getItem('user')));
                if (JSON.parse(localStorage.getItem('user')).role === 'admin') {
                    navigate('/dashboard');
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                } else if (JSON.parse(localStorage.getItem('user')).role === 'author') {
                    navigate('/dashboard-user');
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                }
            }
        },
        onError: (err) => {
            const error = err.graphQLErrors[0].message;
            console.log(error);
        }
    })

    const navigate = useNavigate();

    const [isLoginPage, setIsLoginPage] = useState(false);

    const [inputs, setInputs] = useState([
        {
            label: 'Username',
            type: 'text',
            value: '',
        },
        {
            label: 'Password',
            type: 'password',
            value: '',
        }
    ])

    const handleLogin = (authorData) => {
        // console.log(authorData);
        getOneUser({
            variables: {
                username: authorData.username,
                password: authorData.password
            }
        })
    }

    useEffect(() => {
        setIsLoginPage(true);
    }, []);

    return (
        <div className='login_page'>
            <div className='d-flex align-items-center login_page row'>
                <div className='col'>
                    <h1 className='text-center bg_logo'>Mari<span className='logo'>Baca.co</span></h1>
                </div>
                <div className='col'>
                    <div className='rounded bg_login'>
                        <Form inputs={inputs} handleLogin={handleLogin} isLoginPage={isLoginPage} setInputs={setInputs} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;
