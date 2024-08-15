import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  birthDate:  { type: Date, required: true },
  sex:  { type: String, required: true },
  visits: { type: [Date], default: [] }, 
  
},{ timestamps: true });

export default mongoose.model('Patient', patientSchema);
