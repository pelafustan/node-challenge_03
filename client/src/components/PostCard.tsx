import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";

type PostCardProps = {
  id: string;
  title: string;
  body: string;
  headerImage: string;
}

export const PostCard = ({ title, body, headerImage }: PostCardProps) => {
  return (
    <Card
      title={title}
      cover={<img style={{ width: "90%", margin: 'auto' }} alt={title} src={headerImage} />}
      actions={[
        <EditOutlined key='edit' />,
        <DeleteOutlined key='delete' />
      ]}
    >
      {body}
    </Card>
  )
};
