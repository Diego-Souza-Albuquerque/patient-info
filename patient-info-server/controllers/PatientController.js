import xml2js from 'xml2js';
import Patient from '../models/Patient.js';

function formatXmlData(xmlData) {
  const { name, birthDate, sex, lastVisits } = xmlData.patient;

  const visits = lastVisits && lastVisits.visit 
    ? Array.isArray(lastVisits.visit)
      ? lastVisits.visit.map(date => new Date(date))
      : [new Date(lastVisits.visit)]
    : [];

  return {
    name,
    birthDate: new Date(birthDate),
    sex,
    visits,
  };
}

export const createNewPatient = async (req, res) => {
  let patientData;  

  if (req.is('application/xml')) {
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
      const result = await parser.parseStringPromise(req.body);
      patientData = formatXmlData(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Formato XML inválido' });
    }
  } else {
    patientData = {
      ...req.body,
      visits: req.body.lastVisits,
  }}

  try {
    const patient = new Patient(patientData);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar os dados do paciente' });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pacientes', error });
  }
}
