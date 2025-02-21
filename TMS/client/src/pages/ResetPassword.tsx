import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} from "../redux/slices/api/userApiSlice";
import ModalWrapper from "../components/ModalWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../components/Textbox";
import { toast } from "sonner";
import Loading from "../components/Loader";

interface ResetPasswordFormData {
  password: string;
}
const ResetPassword = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const { error, isLoading } = useValidateResetTokenQuery(token!);
  const [resetPassword] = useResetPasswordMutation();
  const [navgateLogin, setNavigateLogin] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const handleOnSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    console.log(data, "RP");

    setMessage("");
    try {
      const res = await resetPassword({
        token: token!,
        password: data.password,
      }).unwrap();
      setMessage(res.message);
      toast.success(res.message);
      if (res?.status) {
        setNavigateLogin(true);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
      setMessage(err?.data?.message || "Error resetting password");
    }
  };

  if (isLoading)
    return (
      <div className="py-5">
        <Loading />
      </div>
    );
  if (error)
    return (
      <h2 className="text-base ml-10 font-bold leading-6 text-red-600 mb-4">
        Invalid or expired token
      </h2>
    );

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <DialogTitle
        as="h2"
        className="text-base font-bold leading-6 text-gray-900 mb-4"
      >
        Reset Password
      </DialogTitle>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="mt-4">
        <Textbox
          placeholder="Enter your new password"
          type="password"
          name="password"
          label="New Password"
          className="w-full rounded"
          register={register("password", {
            required: "New password is required!",
          })}
          error={errors?.password?.message as string | undefined}
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-green-600" aria-live="polite">
          {message}
        </p>
      )}
      {navgateLogin && (
        <p>
          Please try to{" "}
          <span
            className="mt-4 text-sm font-bold text-blue-600 hover:underline hover:cursor-pointer"
            aria-live="polite"
            onClick={() => navigate("/log-in")}
          >
            Login
          </span>{" "}
          again to verify...
        </p>
      )}
    </ModalWrapper>
  );
};

export default ResetPassword;
