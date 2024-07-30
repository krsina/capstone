import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import Filter from '../common/Filter';

function Event() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/posts/getPosts') // Adjust the URL to your actual endpoint
            .then(response => {
                const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPosts(sortedPosts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
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
                    <div key={post.id} className="flex sm:flex-row flex-col border-primary border-b border-t p-4">
                        <div className="lg:w-[30rem] lg:h-[30rem] bg-gray-400 rounded-lg overflow-hidden"> {/* Adjusted image container */}
                            {post.image_url ? (
                                <img src={post.image_url} alt="Event" className="w-full h-full object-cover border border-secondary rounded-lg transition-transform duration-200 hover:scale-125" />
                            ) : (
                                <p className="text-white">No image available</p>
                            )}
                        </div>
                        <div className="flex flex-col items-start justify-between sm:ml-6 sm:pt-0 pt-4  sm:space-y-0 space-y-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-row gap-2">
                                    <img className="w-10 h-10 rounded-full bg-gray-800" src={post.club_avatar} alt="Club avatar" />
                                    <h1 className="font-encode-sans text-2xl font-semibold">{post.club_name}</h1>
                                </div>
                                <h1 className="font-encode-sans text-xl font-semibold">{post.title}</h1>
                                <div className="flex flex-row gap-4 items-start">
                                    <p className="text-xs md:text-base">
                                        <span className="font-bold">Date: </span>
                                        {post.event_date}
                                    </p>
                                    <p className="text-xs md:text-base">
                                        <span className="font-bold">Time: </span>
                                        {post.start_time} - {post.end_time} |
                                    </p>
                                    <p className="text-xs md:text-base">
                                        <span className="font-bold">Location: </span>
                                        {post.location}
                                    </p>
                                </div>
                                <p className="lg:w-[30rem] text-xs md:text-base">{post.body}</p>
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
