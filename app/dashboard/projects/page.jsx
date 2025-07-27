'use client';

import { useEffect, useState } from 'react';
import { fetchProjects, addProject, addTask } from './action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [taskForms, setTaskForms] = useState({}); // projectId → form

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', projectForm.name);
    data.append('description', projectForm.description);
    await addProject(data);
    setProjectForm({ name: '', description: '' });
    setProjects(await fetchProjects());
  };

  const handleTaskSubmit = async (projectId) => {
    const form = taskForms[projectId];
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('projectId', projectId);
    await addTask(data);
    setTaskForms({ ...taskForms, [projectId]: { title: '', description: '' } });
    setProjects(await fetchProjects());
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <form onSubmit={handleProjectSubmit} className="space-y-3 max-w-md mb-8">
        <Input
          placeholder="Project Name"
          value={projectForm.name}
          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
          required
        />
        <Textarea
          placeholder="Description"
          value={projectForm.description}
          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
        />
        <Button type="submit">Add Project</Button>
      </form>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>

            <h4 className="text-sm font-medium mt-2 mb-1">Tasks:</h4>
            {project.tasks.length === 0 && <p className="text-xs text-muted-foreground">No tasks yet.</p>}
            {project.tasks.map((task) => (
              <div key={task.id} className="border p-2 rounded mb-2 bg-muted/20">
                <p className="font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.description}</p>
                <p className="text-xs text-right italic mt-1">Status: {task.status}</p>
              </div>
            ))}

            <div className="mt-4 space-y-2">
              <Input
                placeholder="Task Title"
                value={taskForms[project.id]?.title || ''}
                onChange={(e) =>
                  setTaskForms((prev) => ({
                    ...prev,
                    [project.id]: { ...prev[project.id], title: e.target.value },
                  }))
                }
              />
              <Input
                placeholder="Task Description"
                value={taskForms[project.id]?.description || ''}
                onChange={(e) =>
                  setTaskForms((prev) => ({
                    ...prev,
                    [project.id]: { ...prev[project.id], description: e.target.value },
                  }))
                }
              />
              <Button onClick={() => handleTaskSubmit(project.id)}>Add Task</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
