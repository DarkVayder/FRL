import app from "./app";
import { ENV } from "./config/env";

app.listen(ENV.PORT, () => {
  console.log(`Backend running on http://localhost:${ENV.PORT}`);
});