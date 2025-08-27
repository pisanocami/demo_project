import React, { useEffect } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { ProjectsList } from '../components/ProjectsList';

export const Projects: React.FC = () => {
  const { projects, loading, error, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ProjectsList />;
};
