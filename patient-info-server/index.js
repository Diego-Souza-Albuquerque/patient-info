import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import routes from './routes/patients.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'application/xml' })); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'application/xml' }));

mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/patientDB')
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro na conexão com o MongoDB:", err));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor foi iniciado na porta ${PORT}`);
});
