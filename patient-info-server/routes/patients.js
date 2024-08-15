import express from 'express';
import {createNewPatient, getAllPatients} from '../controllers/PatientController.js';

const router = express.Router();

router.post('/createnewpatient', createNewPatient);
router.get('/getAllPatients', getAllPatients);

export default router;
