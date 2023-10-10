import { Request, Response } from 'express';
import express from "express";

const router = express.Router()

// get
router.get("/", function (req: Request, res: Response) {
    res.send("Justify Get")
})

module.exports = router;
