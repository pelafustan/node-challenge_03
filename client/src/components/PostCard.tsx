import { DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import PostCreationForm from './PostCreationForm';
import { usePosts } from '../hooks/usePosts';

type PostCardProps = {
  id: string;
  title: string;
  body: string;
  headerImage: string;
  likes: string;
}

const URL = import.meta.env.VITE_BACK_URL || 'http://localhost:3000/posts';

export const PostCard = ({ id, title, body, headerImage, likes }: PostCardProps) => {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { submitted, setSubmitted } = usePosts();

  const onEdit = () => {
    setModal(true);
  }

  const onDelete = () => {
    setConfirm(true);
  };

  const handleLike = async () => {
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, 'true');
      await fetch(`${URL}/${id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'likes': parseInt(likes) + 1 })
      });
      setSubmitted(!submitted);
    } else {
      localStorage.setItem(id, '');
      await fetch(`${URL}/${id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'likes': parseInt(likes) - 1 })
      });
      setSubmitted(!submitted);
    }
  }

  const handleDeletion = async () => {
    setLoading(true);
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    console.log(`${id}`);
    setLoading(false);
    setSubmitted(!submitted);
    setConfirm(false);
  };

  return (
    <>
      <Card
        title={title}
        style={{ minWidth: 200 }}
        cover={<img style={{ width: "90%", margin: 'auto' }} alt={title} src={headerImage} />}
        actions={[
          <EditOutlined key='edit' onClick={onEdit} style={{ fontSize: '1.5rem' }} />,
          <Popconfirm
            title='Confirm deletion?'
            description='Are you sure? This action cannot be undone once performed.'
            open={confirm}
            onConfirm={handleDeletion}
            onCancel={() => setConfirm(false)}
            okButtonProps={{ loading: loading }}
          >
            <DeleteOutlined key='delete' onClick={onDelete} style={{ fontSize: '1.5rem' }} />
          </Popconfirm>,
          <Badge count={likes} size='small'>
            <Button type='text' style={{ margin: 0, padding: 0 }} onClick={handleLike}>
              {!localStorage.getItem(id) ? <HeartOutlined style={{ fontSize: '1.5rem' }} /> : <HeartFilled style={{ fontSize: '1.5rem', color: 'red' }} />}
            </Button>
          </Badge>
        ]}
      >
        {body}
      </Card>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={[<Button key='cancel' onClick={() => setModal(false)}>Cancel</Button>]}
      >
        <PostCreationForm isUpdate={true} postId={id} setModal={setModal} />
      </Modal>
    </>
  )
};
