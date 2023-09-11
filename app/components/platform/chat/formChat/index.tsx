"use client";
import { Button, Form, Input } from "antd";
import { useSocket } from "../../../../shared/providers/context/socket";
import { ChatEvents } from "../../../../shared/constants/socket.events";
import { useForm } from "antd/es/form/Form";

interface IFormChat {
  message: string;
}

const FormChat = () => {
  const [form] = useForm();
  const { socket } = useSocket();
  const handleChangeSendMessage = () => {
    socket.emit(ChatEvents.isTyping, {
      room: "64fc49e8162e3f4b3bb24286",
      isTyping: true,
    });
  };
  const onFinish = async (value: IFormChat) => {
    socket.emit(ChatEvents.sendMessage, {
      room: "room1",
      message: value.message,
    });
    socket.emit(ChatEvents.isTyping, {
      room: "room1",
      isTyping: false,
    });

    console.log("value", value);
  };
  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item<IFormChat> name="message">
          <Input
            onChange={(e) => {
              handleChangeSendMessage();
              form.setFieldValue("message", e.target.value);
            }}
          />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Send
        </Button>
      </Form>
    </>
  );
};
export default FormChat;
