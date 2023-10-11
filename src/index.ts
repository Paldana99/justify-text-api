import express, {Express, Request, Response} from 'express';
import bodyParser from "body-parser";
import 'dotenv/config'

require('dotenv').config()

//routes for the justify API
const justifyRoute = require('./routes/justify')
const authRoute = require('./routes/auth')

const port = process.env.PORT || '8080';

const app: Express = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use(express.json())
app.use('/api/token', authRoute)
app.use(bodyParser.text());
app.use('/api/justify', justifyRoute)

const server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}!`);
});

module.exports = {
    server
}
