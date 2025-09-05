import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import config from "./src/config/environment.js";


 app.listen(config.port, () => {
  console.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${config.port}`
  );
});
connectDB();
