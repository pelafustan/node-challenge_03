import { Button, Form, Input  } from "antd";
import { usePosts } from "../hooks/usePosts";

const REACT_APP_BACK_PORT = import.meta.env.VITE_BACK_PORT || 3000;

type FormProps = {
  isUpdate?: boolean;
  postId?: string;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostCreationForm({ isUpdate = false, postId, setModal }: FormProps) {

  const [form] = Form.useForm();

  const { posts, submitted, setSubmitted } = usePosts();

  type FormData = {
    postTitle: string;
    postBody: string;
    postHeaderImage: string;
  }

  const onReset = () => {
    form.resetFields();
  };

  let idx = -1

  if (isUpdate && postId) {
    idx = posts.findIndex(song => song.postId === postId);
  }

  const onFinish = async (values: FormData) => {
    if (!isUpdate) {
      try {
        const response = await fetch(`http://localhost:${REACT_APP_BACK_PORT}/newPost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        });

        response.ok
          ? console.log('Form sent to backend!')
          : console.log('Form failed!');

        setSubmitted(!submitted);

        form.resetFields();

      } catch (err) {
        console.log(err);
      }
    } else {
      const response = await fetch(`https://localhost:${REACT_APP_BACK_PORT}/posts:${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      response.ok
        ? console.log('Form sent to backend!')
        : console.log('Form failed!');

      setSubmitted(!submitted);
      setModal!(false);
    }
  };

  return (
    <>
      <Form<FormData>
        layout="vertical"
        style={{ width: "60%" }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name='postTitle'
          label='Title'
          initialValue={isUpdate ? posts[idx].postTitle : ''}
          rules={[{
            required: true,
            message: 'Please, input a title!'
          }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name='postBody'
          label='What are you thinking?'
          initialValue={isUpdate ? posts[idx].postBody : ''}
          rules={[{
            required: true,
            message: 'Please, write something!'
          }]}
        >
          <Input.TextArea placeholder="Your thoughts" autoSize={{ minRows: 4, maxRows: 8 }} />
        </Form.Item>
        <Form.Item
          name='postHeaderImage'
          label='Header Image URL'
          initialValue={isUpdate ? posts[idx].postHeaderImage : ''}
          rules={[{
            required: true,
            message: 'Please, pass me the image URL!'
          }]}
        >
          <Input placeholder="URL" />
        </Form.Item>
        <Button type={!isUpdate ? 'primary' : 'text'} htmlType='submit'>
          {!isUpdate ? 'Submit' : 'Update'}
        </Button>
        <Button
          htmlType='button'
          onClick={onReset}
          style={{
            margin: '1rem',
          }}
        >
          Reset
        </Button>
      </Form>
    </>
  )
}
