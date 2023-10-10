import express, {Request, Response} from 'express';
import {GetToken, PostToken} from "../middleware/auth";

const router = express.Router()

// get
router.get("/", function (req: Request, res: Response) {
    let mail = req.body.mail
    if (!mail) {
        return res.status(401).send("Bad request: No mail in body")
    }
    GetToken(mail).then((token) => {
        if (!token) {
            return res.status(401).send("No token with this mail")
        }
        return res.send(token)
    })
})

router.post("/", function (req: Request, res: Response) {
    let mail = req.body.mail
    if (!mail) {
        return res.status(401).send("Bad request: No mail in body")
    }
    PostToken(mail).then((token) => {
        return res.send(token)
    })

})

module.exports = router;
