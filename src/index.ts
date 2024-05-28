import express, { Request, Response } from 'express';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

const app = express();
const port = 3000;

const influxDB = new InfluxDB({ url: 'http://localhost:8086', token: 'my-super-secret-auth-token' });
const writeApi = influxDB.getWriteApi('metahouse', 'metrics-server');

app.use(express.json());

interface Metric {
  name: string;
  value: number;
  unit?: string;
}

interface MetricsPayload {
  device_id: string;
  timestamp: string;
  metrics: Metric[];
}

app.post('/metrics', (req: Request, res: Response) => {
  const metricsPayload: MetricsPayload = req.body;

  // Validate the payload
  if (!metricsPayload.device_id || !metricsPayload.timestamp || !metricsPayload.metrics) {
    return res.status(400).send('Invalid payload');
  }

  const timestamp = new Date(metricsPayload.timestamp);
  const device_id = metricsPayload.device_id;

  metricsPayload.metrics.forEach(metric => {
    const point = new Point('device_metrics')
      .tag('device_id', device_id)
      .timestamp(timestamp)
      .floatField(metric.name, metric.value);

    if (metric.unit) {
      point.tag(`${metric.name}_unit`, metric.unit);
    }

    writeApi.writePoint(point);
  });

  writeApi.flush()
    .then(() => {
      res.status(200).send('Metrics received');
    })
    .catch((error: any) => {
      console.error('Error writing to InfluxDB', error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
