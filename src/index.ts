import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/metrics', (req: Request, res: Response) => {
  const metrics = req.body;
  console.log('Received metrics:', metrics);

  // Here you can add logic to process and store the metrics

  res.status(200).send('Metrics received');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
