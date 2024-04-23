import { useContext } from 'react';
import { PostContext } from '../contexts/PostsProvider';

export const usePosts = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostsContext must be used within a PostsContextProvider');
  }

  return context;
}
