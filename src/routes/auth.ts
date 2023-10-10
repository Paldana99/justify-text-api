import express, {Request, Response} from 'express';
import {PostToken} from "../middleware/auth";

const router = express.Router()

// get
router.get("/", function (req: Request, res: Response) {
    res.send("Auth Get")
})

router.post("/", function (req: Request, res: Response) {
    let mail = req.body.mail
    if (!mail) {
        return res.status(401).send("Bad request: No mail in body")
    }
    let token = PostToken(mail)
    return res.send(mail)
})

module.exports = router;
