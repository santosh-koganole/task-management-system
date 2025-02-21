import { useState } from "react";
import { useForgotPasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import Textbox from "../components/Textbox";
import { SubmitHandler, useForm } from "react-hook-form";
import ModalWrapper from "../components/ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Loading from "../components/Loader";
interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [forgotPassword, { isLoading: isUpdating }] =
    useForgotPasswordMutation();
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ForgotPasswordFormData>();
  const handleOnSubmit: SubmitHandler<ForgotPasswordFormData> = async (
    data
  ) => {
    setMessage("");
    try {
      const res = await forgotPassword(data).unwrap();
      setMessage(res.message);
      toast.success(res.message);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
      setMessage(err?.data?.message || "Error sending reset link");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <DialogTitle
        as="h2"
        className="text-base font-bold leading-6 text-gray-900 mb-4"
      >
        Forgot Password
      </DialogTitle>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="mt-4">
        <Textbox
          placeholder="Enter your email"
          type="text"
          name="email"
          label="Email"
          className="w-full rounded"
          register={register("email", {
            required: "Email is required!",
          })}
          error={errors?.email?.message as string | undefined}
        />
        {isUpdating ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        )}
      </form>
      {message && (
        <p className="mt-4 text-sm text-green-600" aria-live="polite">
          {message}
        </p>
      )}
    </ModalWrapper>
  );
};

export default ForgotPassword;
