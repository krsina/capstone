import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Event() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/posts/getPosts') // Adjust the URL to your actual endpoint
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className="sm:ml-80 py-20 md:px-28 px-6 flex flex-col gap-y-12 text-secondary">
            <div className="md:text-4xl text-3xl font-encode-sans font-semibold">
                <h1>Recent Posts</h1>
            </div>
            {posts.length === 0 ? (
                <div className="flex items-center justify-center">
                    <p>No posts available</p>
                </div>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="flex items-center justify-center">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <img className="w-10 h-10 rounded-full bg-gray-800" src={post.club_avatar} alt="Club avatar" />
                                <h1 className="font-encode-sans text-2xl font-semibold">{post.club_name}</h1>
                            </div>
                            <div className="relative rounded lg:w-[34rem] lg:h-[26rem] bg-gray-400 items-center justify-center flex">
                                {post.image_url ? (
                                    <img src={post.image_url} alt="Event" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <h1>This is a placeholder for image</h1>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-encode-sans text-xl font-semibold">{post.title}</h1>
                                <p className="lg:w-[34rem] text-xs md:text-base">{post.body}</p>
                                <div className="flex flex-row justify-between gap-4 mx-auto">
                                    <p className="text-xs md:text-base">Date: {post.event_date}</p>
                                    <p className="text-xs md:text-base">Time: {post.start_time} - {post.end_time}</p>
                                    <p className="text-xs md:text-base">Location: {post.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Event;
