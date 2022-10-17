/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

const router = express.Router({ mergeParams: true });

router.use("/", (req, res) => {
  res.render("./index", {});
});

export default router;
