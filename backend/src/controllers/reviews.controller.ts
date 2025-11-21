import { Request, Response } from "express";
import { fetchHostawayReviews } from "../services/hostaway.service";
import { normalizeHostawayReviews } from "../utils/normalizeHostaway";
import { fetchGoogleReviews } from "../services/google.serivce";

export async function getHostawayReviews(req: Request, res: Response) {
  try {
    const raw = await fetchHostawayReviews();
    const normalized = normalizeHostawayReviews(raw);
    res.json({ success: true, data: normalized });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching reviews" });
  }
}

export async function getGoogleReviews(req: Request, res: Response) {
  try {
    const data = await fetchGoogleReviews();
    res.json({ success: true, data });
  } catch {
    res.json({ success: false, message: "Google API exploration only" });
  }
}