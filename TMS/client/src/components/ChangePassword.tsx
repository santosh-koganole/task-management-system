import { SubmitHandler, useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import ModalWrapper from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";

interface ChangePasswordProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormValues = {
  password: string;
  cpass: string;
};
const ChangePassword: React.FC<ChangePasswordProps> = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [ChangeUserPassword, { isLoading }] = useChangePasswordMutation();

  const encodePassword = (password: string) => {
    return btoa(password); // Convert string to Base64
  };
  const handleOnSubmit: SubmitHandler<FormValues> = async (data) => {
    const encodedPassworNew = encodePassword(data.password);
    const encodedPasswordConfirm = encodePassword(data.cpass);

    data = {
      ...data,
      password: encodedPassworNew,
      cpass: encodedPasswordConfirm,
    };

    if (data.password !== data.cpass) {
      toast.warning("Passwords doesn't match");
      return;
    }
    try {
      await ChangeUserPassword(data).unwrap();
      toast.success("Password changed successfully");

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "New Password is required!",
              })}
              error={errors?.password?.message as string | undefined}
            />
            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="cpass"
              label="Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm New Password is required!",
              })}
              error={errors?.cpass?.message as string | undefined}
            />
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Save"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};
export default ChangePassword;
