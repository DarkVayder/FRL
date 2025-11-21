import { Router } from "express";
import { getHostawayReviews, getGoogleReviews } from "../controllers/reviews.controller";

const router = Router();

router.get("/hostaway", getHostawayReviews);
router.get("/google", getGoogleReviews);

export default router;
