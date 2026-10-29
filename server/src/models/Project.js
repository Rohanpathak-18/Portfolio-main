import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    stack: { type: [String], default: [] },
    visual: { type: String, default: 'study' },
    mark: { type: String, default: 'R' },
    link: { type: String, default: null },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
