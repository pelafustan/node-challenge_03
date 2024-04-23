import { List } from 'antd';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from './PostCard';

export const PostGrid = () => {
  const { posts } = usePosts();

  return (
    <>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={posts}
        renderItem={(item) => (
          <List.Item key={item.postId}>
            <PostCard id={item.postId} title={item.postTitle} body={item.postBody} headerImage={item.postHeaderImage} />
          </List.Item>
        )}
      />
    </>
  )
};
