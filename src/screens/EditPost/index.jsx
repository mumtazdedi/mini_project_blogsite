import React, { useState, useEffect } from 'react';
/** Components */
import Form from '../../components/Form';
/** React Router */
import { useNavigate, useParams, useLocation } from 'react-router-dom';
/** Apollo client */
import { useMutation, useQuery } from '@apollo/client';
/** GraphQL */
import { GET_POSTS, UPDATE_POST } from '../../GraphQL/Posts/queries';
import { GET_AUTHORS } from '../../GraphQL/Users/queries';

const EditPost = () => {

    const { id } = useParams();

    const location = useLocation();

    const [postData, setPostData] = useState([]);

    // const [authorData, setAuthorData] = useState([]);

    const { loading, error, data } = useQuery(GET_POSTS, {
        onCompleted: (data) => {
            const post = data.blogs_posts.filter((post) => post.id === parseInt(id));
            // const newPost = {};
            // newPost.id = post[0].id;
            // newPost.judul = post[0].judul;
            // newPost.isi = post[0].isi;
            // newPost.id_penulis = post[0].id_penulis;
            // newPost.kategori = post[0].kategori;
            // newPost.post_banner = post[0].post_banner;
            // newPost.nama = post[0].user.nama;
            setPostData(post);
            // console.log(postData);
        }
    })

    // const { loading: authorLoading, error: authorError, data: dataAuthor } = useQuery(GET_AUTHORS, {
    //     onCompleted: (dataAuthors) => {
    //         if (postData.length > 0) {
    //             const author = dataAuthors.blogs_users.filter((author) => author.id === postData[0].id_penulis);
    //             setAuthorData(author);
    //             console.log(author);
    //         }
    //     }
    // })

    const navigate = useNavigate();

    const [updatePost] = useMutation(UPDATE_POST, {
        refetchQueries: [{ query: GET_POSTS }],
    })

    const [inputs, setInputs] = useState([
        {
            label: 'Judul',
            type: 'text',
            value: ''
        },
        {
            label: 'Isi Konten',
            type: 'text',
            value: ''
        },
        {
            label: 'Kategori',
            type: 'radio',
            value: '',
        },
        {
            label: 'Penulis',
            type: 'text',
            value: '',
        },
        {
            label: 'Post Pic',
            type: 'hidden',
            value: ''
        },
        {
            label: 'Id',
            type: 'hidden',
            value: 0
        },
        {
            label: 'Id Penulis',
            type: 'hidden',
            value: 0
        }
    ]);

    const [isEdit, setIsEdit] = useState(false);

    const [isFormPost, setIsFormPost] = useState(false);


    // const author_user = authorData.authors.filter((author) => author.id === post_user[0].id_penulis);

    // console.log(author);

    useEffect(() => {
        // if (author_user[0] !== undefined) {
        //     const newInputs = [...inputs];
        //     newInputs[0].value = post_user[0].judul;
        //     newInputs[1].value = post_user[0].isi;
        //     newInputs[2].value = post_user[0].kategori;
        //     newInputs[3].value = author_user[0].nama;
        //     newInputs[4].value = post_user[0].post_banner;
        //     newInputs[5].value = post_user[0].id;
        //     setInputs(newInputs);
        // } else {
        const newInputs = [...inputs];
        newInputs[0].value = postData[0].judul;
        newInputs[1].value = postData[0].isi;
        newInputs[2].value = postData[0].kategori;
        newInputs[3].value = postData[0].user.nama;
        newInputs[4].value = postData[0].post_banner;
        newInputs[5].value = postData[0].id;
        newInputs[6].value = postData[0].id_penulis;
        setInputs(newInputs);
        // }
        // console.log(inputs);
    }, []);

    useEffect(() => {
        setIsFormPost(true);
        setIsEdit(true);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigate('/login');
        }
    }, []);

    const updatePostData = (newUpdatePostData) => {
        updatePost({
            variables: {
                id: newUpdatePostData.id,
                judul: newUpdatePostData.judul,
                isi: newUpdatePostData.isi,
                post_banner: newUpdatePostData.post_banner,
                id_penulis: newUpdatePostData.id_penulis,
                kategori: newUpdatePostData.kategori
            }
        })

        if (location.pathname === `/dashboard-user/edit-post/${newUpdatePostData.id}`) {
            navigate('/dashboard-user');
        } else {
            navigate('/dashboard');
        }

    }


    return (
        <div className='m-3'>
            <h1 className='m-3'>Edit Postingan</h1>
            {
                loading === false && data ? (
                    <div className='p-3 bg_primary rounded text-light'>
                        <Form updatePostData={updatePostData} isEdit={isEdit} setIsEdit={setIsEdit} isFormPost={isFormPost} setIsFormPost={setIsFormPost} inputs={inputs} setInputs={setInputs} />
                    </div>
                ) : (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )
            }
        </div>
    );
}

export default EditPost;
