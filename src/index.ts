import express, { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import dotenv from 'dotenv'

const app: Express = express();
app.use(cookieParser());
// app.use(function(req, res, next) {  
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Credentials', '');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(cors());
const port = process.env.PORT ?? 3002;

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

type ResType = { message: string };

app.get('/api/hello', ( req: Request, res: Response<ResType> ) => {
  res.status(200).send({ message: 'Helloouu this is a GET request :)' })
})

app.post('/api/hola', cors(corsOptions), ( req: Request, res: Response<ResType> ) => {
  console.log(req.body);
  // const name = req.body.name as string;

  // if(!name) return res.status(401).send({ message: 'Name is required!' })

  const token = jwt.sign({
    name: 'holaasdasd',
  }, 'secret');

  res.cookie('authEx', token);
  res.status(201).send({ message: 'Cookie added' });
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})