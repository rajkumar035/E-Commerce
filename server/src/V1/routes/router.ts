import express from "express";
import AuthControl from "../controller/authController";

const router = express.Router({ caseSensitive: true });

router.post("/login", AuthControl.loginByOtp);
router.post("/verifyOtp", AuthControl.verifyOtpRole);
router.get("/refreshToken/:id", AuthControl.createRefreshToken);
router.get("/logout/:id", AuthControl.logout);

export = router;
