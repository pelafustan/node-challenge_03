import { createContext, useEffect, useState } from 'react';

type Post = {
  postId: string;
  postTitle: string;
  postBody: string;
  postHeaderImage: string;
  likes: string;
};

type PostJSON = {
  id: string;
  title: string;
  body: string;
  header_image: string;
  likes: string;
};

type PostContext = {
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[],
};

const REACT_APP_BACK_PORT = import.meta.env.VITE_BACK_PORT || 3000;

const url = `http://localhost:${REACT_APP_BACK_PORT}/posts`;

export const PostContext = createContext({} as PostContext);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState([] as Post[]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch(url)
        .then(res => res.json())
        .then(data => data.map((item: PostJSON) => ({
          postId: item.id,
          postTitle: item.title,
          postBody: item.body,
          postHeaderImage: item.header_image,
          likes: item.likes,
        })))
      setPosts(data);
      data.forEach((item: Post) => {
        if (!localStorage.getItem(item.postId)) {
          localStorage.setItem(item.postId, '');
        }
      });
    }
    getPosts();
  }, [submitted]);

  return (
    <PostContext.Provider
      value={{
        submitted,
        setSubmitted,
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
