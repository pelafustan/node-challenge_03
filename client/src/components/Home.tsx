import { Button, Divider, Layout } from 'antd';
import { CameraTwoTone, LikeFilled, MenuOutlined } from '@ant-design/icons';
import PostCreationForm from './PostCreationForm';
import { PostGrid } from './PostGrid';

const { Header, Content, Footer } = Layout;

export const Home = () => {

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          color: 'rgb(244, 219, 214)',
          backgroundColor: 'rgb(73, 77, 100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          fontSize: '1.5rem',
        }}
      >
        <div>
          <h2><CameraTwoTone twoToneColor={"#8aadf4"} /></h2>
        </div>
        <div>
          <h2>Like Me! <LikeFilled rotate={-30} style={{ color: '#7dc4e4' }} /></h2>
        </div>
        <div>
          <Button type='text'>
            <h2><MenuOutlined style={{ color: '#7dc4e4' }} /></h2>
          </Button>
        </div>
      </Header>
      <Content
        style={{
          padding: '0 1.5rem',
          margin: '1rem 0',
        }}
      >
        <div
          style={{
            padding: 24,
            backgroundColor: '#fff',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Divider><h2>New Post</h2></Divider>
          <PostCreationForm />
          <Divider><h2>Posts</h2></Divider>
          <PostGrid />
        </div>
      </Content>
      <Footer
        style={{
          color: 'rgb(244, 219, 214)',
          backgroundColor: 'rgb(73, 77, 100)',
          textAlign: 'center',
        }}
      >
        Like Me! ©{new Date().getFullYear()} Created by Pela Fustán
      </Footer>
    </>
  )
};
