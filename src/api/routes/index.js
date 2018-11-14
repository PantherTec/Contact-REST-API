import ContactRouter from "./contact";
import userRouter from "./user";
import docsRouter from "./docs";

module.exports = app => {
  /* GET home page. */
  app.get("/api", (req, res) => {
    res.json({
      name: "The contact core service",
      status: "running",
      version: "0.1"
    });
  });
  app.use("/api/contacts", ContactRouter);
  app.use("/api/users", userRouter);
  app.use("/api/docs", docsRouter);
};
