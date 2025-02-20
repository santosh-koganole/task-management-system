import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { DialogTitle } from "@headlessui/react";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { IUser } from "../Interfaces";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCredentials } from "../redux/slices/authSlice";
import SelectList from "./SelectList";
import { useState } from "react";

type AddUserProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData?: any; // Adjust the type based on your actual data structure
  refetch?: () => void;
};
const AddUser: React.FC<AddUserProps> = ({
  open,
  setOpen,
  userData,
  refetch,
}) => {
  const defaultValues = userData ?? {};
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ defaultValues });
  const LISTS_ROLE = ["Admin", "User"];
  const [role, setRole] = useState(userData ? userData?.role : LISTS_ROLE[1]);
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const handleOnSubmit = async (data: IUser) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        if (refetch) {
          refetch();
        }
        toast.success("Profile updated successfully");
        if (userData?._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({
          ...data,
          password: data?.email,
          isAdmin: data?.role === "Admin" ? true : false,
        }).unwrap();

        if (refetch) {
          refetch();
        }
        toast.success("New user added successfully");
      }
      setTimeout(() => {
        setOpen(false);
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Full name"
              type="text"
              name="name"
              label="Full Name"
              className="w-full rounded"
              register={register("name", {
                required: "Full name is required!",
              })}
              // error={errors.name ? errors.name.message : ""}
              error={errors?.name?.message as string | undefined}
            />
            <Textbox
              placeholder="Title"
              type="text"
              name="title"
              label="Title"
              className="w-full rounded"
              register={register("title", {
                required: "Title is required!",
              })}
              // error={errors.title ? errors.title.message : ""}
              error={errors?.title?.message as string | undefined}
            />
            <Textbox
              placeholder="Email Address"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded"
              register={register("email", {
                required: "Email Address is required!",
              })}
              // error={errors.email ? errors.email.message : ""}
              isDisabled={false}
              error={errors?.email?.message as string | undefined}
            />

            <SelectList
              label="Role"
              lists={LISTS_ROLE}
              selected={role}
              setSelected={setRole}
              registerName="role" // Register the field in RHF
              setValue={setValue} // Sync value with form
              trigger={trigger} // Trigger validation
              isDisabled={userData?._id === user._id}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Submit"
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

export default AddUser;
