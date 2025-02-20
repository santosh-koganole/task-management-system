import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";
import landingPageImage from "../assets/unrecognizable-businesswoman-sitting-desk-with-laptop-looking-calendar_1098-20530.jpg";

function Login() {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue to preserve email field
    setError, // Optionally set an error message for password
  } = useForm<{ email: string; password: string }>({
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && navigate("/dashboard");
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data: { email: string; password: string }) => {
    try {
      const result = await login(data);
      console.log(result);

      if ("error" in result) {
        throw result?.error;
      } else {
        dispatch(setCredentials(result.data));
        navigate("/");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };

      setValue("email", data?.email);
      setValue("password", data?.password);
      // Optionally show an error message for password
      setError("password", {
        message: err?.data?.message,
      });
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${landingPageImage})` }}
      ></div>

      <div className="relative w-full md:w-auto flex gap-0 md-gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left Side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-700 text-gray-800">
              Manage all your tasks in one place
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl-text-7xl font-black text-center text-blue-700">
              <span>My Task Manager</span>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center m-4 items-center relative">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14 shadow-lg rounded-lg"
          >
            <div>
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </p>
              <p className="text-center text-base text-gray-700">
                Keep all your credentials safe.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email?.message}
              />
              <Textbox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              {/* <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Forget Password?
              </span> */}

              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="Submit"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
