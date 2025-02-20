import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} from "../redux/slices/api/userApiSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Validate token
  const { data, error, isLoading } = useValidateResetTokenQuery(token!);
  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ token: token!, password }).unwrap();
      setMessage(res.message);
    } catch (error) {
      setMessage("Error resetting password");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Invalid or expired token</p>;

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
