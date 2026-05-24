import React, { useState } from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import InputField from "./common/InputField";
import Button from "./common/Button";
import { Form } from "antd";

interface LoginFormProps {
  role: string;
  title: string;
  subtitle: string;
}

const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginForm = ({ role, title, subtitle }: LoginFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = (values: { email: string; password: string }) => {
    console.log("Received values of form:", values);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors"
          >
            <ArrowLeftIcon size={16} />
            Back to portals
          </Link>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800">
              {title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              {subtitle}
            </p>
          </div>
          <Form
            initialValues={{
              email: "",
              password: "",
            }}
            className="space-y-5"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }, { pattern: validateEmail, message: "Please enter a valid email" }]}
            >
              <InputField
                placeholder="Email address"
                label="Email Address"
                required
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <InputField
                type="password"
                placeholder="Password"
                label="Password"
                required
              />
            </Form.Item>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={loading}
              className="mt-2"
            >
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
