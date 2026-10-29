import Project from '../models/Project.js';

export async function listProjects(_request, response, next) {
  try {
    const projects = await Project.find({ featured: true }).sort({ number: 1 }).lean();
    response.json(projects);
  } catch (error) {
    next(error);
  }
}
