import { Input, Typography } from "antd";
import style from "./style.module.scss";

type TProps = {
  status: "error" | "warning";
  defaultValue: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: "number" | "string" | "textarea";
  value: string;
  handleChange: (value: string) => void;
  error?: string;
};

export default function AppInput({ value, error, ...props }: TProps) {
  const { Text } = Typography;
  return (
    <div className={style.appInput}>
      <Input value={value} {...props} />
      {!!error && <Text type="danger">{error}</Text>}
    </div>
  );
}
