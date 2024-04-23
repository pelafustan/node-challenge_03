import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import PostCreationForm from './PostCreationForm';
import { usePosts } from '../hooks/usePosts';

type PostCardProps = {
  id: string;
  title: string;
  body: string;
  headerImage: string;
}

const URL = import.meta.env.VITE_BACK_URL || 'http://localhost:3000/posts';

export const PostCard = ({ id, title, body, headerImage }: PostCardProps) => {
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
        style={{minWidth: 200}}
        cover={<img style={{ width: "90%", margin: 'auto' }} alt={title} src={headerImage} />}
        actions={[
          <EditOutlined key='edit' onClick={onEdit} />,
          <Popconfirm
            title='Confirm deletion?'
            description='Are you sure? This action cannot be undone once performed.'
            open={confirm}
            onConfirm={handleDeletion}
            onCancel={() => setConfirm(false)}
            okButtonProps={{ loading: loading }}
          >
            <DeleteOutlined key='delete' onClick={onDelete} />
          </Popconfirm>
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
