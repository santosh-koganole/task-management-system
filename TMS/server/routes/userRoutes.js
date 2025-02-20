import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getTeamList,
  changeUserPassword,
  activateUserProfile,
  deleteUserProfile,
  updateUserProfile,
  forgotPassword,
  validateResetToken,
  resetPassword,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, getTeamList);

router.put("/update-user", protectRoute, updateUserProfile);
router.put("/change-password", protectRoute, changeUserPassword);

router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", validateResetToken);
router.post("/reset-password/:token", resetPassword);
// // //   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;
