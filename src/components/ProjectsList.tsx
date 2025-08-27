import { useEffect, useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';

export const ProjectsList = () => {
  const { projects, loading, error, fetchProjects, createProject } = useProjectStore();
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    
    try {
      await createProject(newProjectName, newProjectDesc);
      setNewProjectName('');
      setNewProjectDesc('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
            New Project Name
          </label>
          <input
            id="projectName"
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter project name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDesc">
            Description (optional)
          </label>
          <textarea
            id="projectDesc"
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter project description"
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Project
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            {project.description && <p className="text-gray-600 mt-2">{project.description}</p>}
            <div className="mt-2 text-sm text-gray-500">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
