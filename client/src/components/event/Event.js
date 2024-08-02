import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Filter from '../common/Filter';

function Event() {
    const [posts, setPosts] = useState([]);
    const [club, setClubs] = useState({});


    useEffect(() => {
        axios.get('http://localhost:3001/posts/getPosts') // Adjust the URL to your actual endpoint
            .then(response => {
                const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPosts(sortedPosts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });


        axios.get('http://localhost:3001/club/getAllClubs')
            .then(response => {
                const clubsDict = response.data.reduce((acc, club) => {
                    acc[club.id] = club.name;
                    return acc;
                }, {});
                setClubs(clubsDict);
            })
            .catch(error => {
                console.error('Error fetching clubs:', error);
            });

    }, []);

    // This function sorts the posts based on the order parameter
    const sortPosts = (order) => {
        const sorted = [...posts].sort((a, b) => {
            if (order === 'desc') {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at); // asc sort
            }
        });
        setPosts(sorted);
    }

    if (posts.length === 0) {
        return (
            <div role="status" className="flex items-center justify-center h-screen">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    return (
        <div className="sm:ml-80 py-20 md:px-28 px-6 flex flex-col space-y-12 text-secondary sm:w-3/4">
            <Filter sortPosts={sortPosts} />
            <div className="md:text-4xl text-3xl font-encode-sans font-semibold">
                <h1>Recent Posts</h1>
            </div>
            {posts.length === 0 ? (
                <div className="flex items-center justify-center">
                    <p>No posts available</p>
                </div>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="flex 2xl:flex-row flex-col border-secondary py-5 justify-center xl:items-center ">
                        <div className="flex flex-row gap-2 py-2 2xl:hidden xl:w-[36rem]">
                            <NavLink to={`/organization/${club[post.club_id]}`}>
                                <img className="w-10 h-10 rounded-full bg-gray-800" src={post.club_avatar} alt="Club avatar" />
                            </NavLink>
                            <NavLink to={`/organization/${club[post.club_id]}`}>
                                <h1 className="font-encode-sans text-2xl font-semibold">{club[post.club_id]}</h1>
                            </NavLink>
                        </div>
                        <div className="flex flex-col items-center justify-center sm:pt-0 sm:space-y-0 space-y-4">
                            <div className="xl:w-[36rem] xl:h-[34rem] overflow-hidden">
                                {post.image_url ? (
                                    <img src={post.image_url} alt="Event" className="w-full h-full object-cover border border-secondary rounded-lg" />
                                ) : (
                                    <p className="text-white">No image available</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between 2xl:ml-12 sm:pt-0 2xl:space-y-0 space-y-4">
                            <div className="items-center flex flex-col">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex-row items-center gap-2 border-b py-2 border-secondary 2xl:block hidden ">
                                        <NavLink to={`/organization/${club[post.club_id]}`}>
                                            <img className="w-10 h-10 rounded-full bg-gray-800" src={post.club_avatar} alt="Club avatar" />
                                        </NavLink>
                                        <NavLink to={`/organization/${club[post.club_id]}`}>
                                            <h1 className="font-encode-sans text-2xl font-semibold">{club[post.club_id]}</h1>
                                        </NavLink>
                                    </div>
                                    <h1 className="font-encode-sans text-2xl font-semibold">{post.title}</h1>
                                    <div className="flex flex-row gap-4 items-start">
                                        <p className="text-xs md:text-base">
                                            <span className="font-bold">Date: </span>
                                            {post.event_date}
                                        </p>
                                        <p className="text-xs md:text-base">
                                            {/* Removes div if there is no time */}
                                            {post.start_time && post.end_time && (
                                                <span className="font-bold">Time: </span>
                                            )}
                                            {post.start_time} - {post.end_time}
                                        </p>
                                        <p className="text-xs md:text-base">
                                            {/* Removes div if there is no location */}
                                            {post.location && (
                                                <span className="font-bold">Location: </span>
                                            )}
                                            {post.location}
                                        </p>
                                    </div>
                                    <p className="lg:w-[35rem] text-xs md:text-base">{post.body}</p>
                                </div>
                            </div>

                            <p className="text-xs md:text-base italic">
                                Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Event;
