import express, {Request, Response} from 'express';

const router = express.Router()
const justifyText = require('./../controller/justify')

// get
router.get("/", function (req: Request, res: Response) {
    res.send("Justify Get")
})

router.post("/", function (req: Request, res: Response) {
    if (!req.body.length) {
        return res.status(400).send("Bad request: No text in body")
    }
    const plainText: string = justifyText(req.body)
    res.send(plainText);
})

module.exports = router;
