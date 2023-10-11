import express, {Request, Response} from 'express';

const router = express.Router();
const justifyText = require('../controller/justify');
const authM = require('../middleware/auth')
// get
router.get('/', (req: Request, res: Response) => {
    res.send('Justify Get');
});

router.post('/', authM.authMiddleware, (req: Request, res: Response) => {
    if (!req.body.length) {
        return res.status(401).send('Bad request: No text in body');
    }
    const plainText: string = justifyText(req.body);
    res.send(plainText);
});

export default module.exports = router;
