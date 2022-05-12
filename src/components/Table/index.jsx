import React from 'react';
/** React Router  */
import { Link } from 'react-router-dom';
/** Apollo Client */
import { useMutation } from '@apollo/client';
import { DELETE_AUTHOR } from '../../GraphQL/Authors/queries';
import { DELETE_POST } from '../../GraphQL/Posts/queries';

const Table = ({ data, tHead, isUserDashboard }) => {

    console.log(data)

    const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
        onCompleted(data) {
            console.log(data);
        },
        onError(error) {
            console.log(error);
        }
    })

    const [deletePost] = useMutation(DELETE_POST, {
        onCompleted(data) {
            console.log(data);
        },
        onError(error) {
            console.log(error);
        }
    })

    const handleDeleteAuthor = (id) => {
        deleteAuthor({
            variables: {
                id: id
            }
        })
    }

    const handleDeletePost = (id) => {
        console.log(id);
        deletePost({
            variables: {
                id: id
            }
        })
    }

    return (
        <div>
            {
                <div>
                    <div className='rounded row bg-dark text-light align-items-center p-2'>
                        {
                            tHead.map((head, headIdx) => (
                                head === 'No' ? (
                                    <div className='col-1 text-center' key={headIdx}>{head}</div>
                                ) : (
                                    <div className='col text-center' key={headIdx}>{head}</div>
                                )
                            ))
                        }
                    </div>
                    {
                        tHead.length > 3 ? (
                            // JSON.parse(localStorage.getItem('token')).__typename === 'authors' ? (
                            //     oneAuthor.map((post, itemIdx) => (
                            //         <div className='rounded align-items-center p-2 bg-light row mb-2 card_post' key={itemIdx}>
                            //             <div className='col-1 text-center'>{itemIdx + 1}</div>
                            //             <div className='col text-start'>{post.judul}</div>
                            //             {/* <div className='col text-start'>{post.author.nama}</div> */}
                            //             <div className='col text-center'>
                            //                 <Link to={`/edit-post/${post.id}`} className='btn btn-sm btn-outline-warning mx-2'>Edit</Link>
                            //                 <button onClick={() => {
                            //                     handleDeletePost(post.id)
                            //                 }} className='btn btn-sm btn-outline-danger'>Delete</button>
                            //             </div>
                            //         </div>
                            //     ))
                            // ) : (
                            data.map((item, itemIdx) => (
                                <div className='rounded align-items-center p-2 bg-light row mb-2 card_post' key={itemIdx}>
                                    <div className='col-1 text-center'>{itemIdx + 1}</div>
                                    <div className='col text-center'>{item.judul}</div>
                                    <div className='col text-center'>{item.user.nama}</div>
                                    <div className='col text-center'>
                                        <Link to={`/dashboard/edit-post/${item.id}`} className='btn btn-sm btn-outline-warning mx-2'>Edit</Link>
                                        <button onClick={() => {
                                            handleDeletePost(item.id)
                                        }} className='btn btn-sm btn-outline-danger'>Delete</button>
                                    </div>
                                </div>
                            ))
                            // )
                        ) : (
                            isUserDashboard ? (
                                data.map((item, itemIdx) => (
                                    <div className='rounded align-items-center p-2 bg-light row mb-2 card_post' key={itemIdx}>
                                        <div className='col-1 text-center'>{itemIdx + 1}</div>
                                        <div className='col text-center'>{item.judul}</div>
                                        <div className='col text-center'>
                                            <Link to={`/dashboard-user/edit-post/${item.id}`} className='btn btn-sm btn-outline-warning mx-2'>Edit</Link>
                                            <button onClick={() => {
                                                handleDeleteAuthor(item.id);
                                            }
                                            } className='btn btn-sm btn-outline-danger'>Delete</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                data.map((item, itemIdx) => (
                                    <div className='rounded align-items-center p-2 bg-light row mb-2 card_post' key={itemIdx}>
                                        <div className='col-1 text-center'>{itemIdx + 1}</div>
                                        <div className='col text-center'>{item.nama}</div>
                                        <div className='col text-center'>
                                            <Link to={`/dashboard/authors/edit-author/${item.id}`} className='btn btn-sm btn-outline-warning mx-2'>Edit</Link>
                                            <button onClick={() => {
                                                handleDeleteAuthor(item.id);
                                            }
                                            } className='btn btn-sm btn-outline-danger'>Delete</button>
                                        </div>
                                    </div>
                                ))
                            )
                        )
                    }
                </div>
            }
        </div>
    );
}

export default Table;
