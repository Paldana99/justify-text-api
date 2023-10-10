import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";

//routes for the justify API
const justifyRoute = require('./routes/justify')
const authRoute = require('./routes/auth')

const port = '8080';

const app: Express = express();

app.use(bodyParser.json({ limit: "80mb" }));
app.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



app.use('/api/justify', justifyRoute)
app.use('/api/token', authRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}!`);
});
