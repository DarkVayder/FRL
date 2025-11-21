import axios from "axios";
import { ENV } from "../config/env";
import mock from "../../mock/hostaway.json";

export async function fetchHostawayReviews() {
  try {
    const url = `https://api.hostaway.com/v1/reviews?accountId=${ENV.HOSTAWAY_ACCOUNT_ID}`;
    const response = await axios.get(url, {
      headers: { "Authorization": `Bearer ${ENV.HOSTAWAY_API_KEY}` }
    });

    if (response.data?.result?.length) return response.data.result;
  } catch (e) {
    console.log("Using mock Hostaway data…");
  }

  return mock.result;
}