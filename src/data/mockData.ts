
import { User, Project, Task } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b0?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    progress: 75,
    status: 'active',
    members: [mockUsers[0], mockUsers[1]],
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-11-15'),
    dueDate: new Date('2023-12-31')
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement',
    progress: 45,
    status: 'active',
    members: [mockUsers[1], mockUsers[2]],
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-11-10'),
    dueDate: new Date('2024-02-28')
  },
  {
    id: '3',
    name: 'Database Migration',
    description: 'Migrate from legacy database to cloud solution',
    progress: 90,
    status: 'active',
    members: [mockUsers[0], mockUsers[2]],
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2023-11-12'),
    dueDate: new Date('2023-11-30')
  },
  {
    id: '4',
    name: 'Marketing Campaign',
    description: 'Q4 digital marketing campaign planning and execution',
    progress: 100,
    status: 'completed',
    members: [mockUsers[1]],
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2023-10-31'),
    dueDate: new Date('2023-10-31')
  },
  {
    id: '5',
    name: 'API Documentation',
    description: 'Comprehensive API documentation for developers',
    progress: 20,
    status: 'on-hold',
    members: [mockUsers[0]],
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-20'),
    dueDate: new Date('2024-01-15')
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage',
    status: 'completed',
    priority: 'high',
    assignee: mockUsers[1],
    projectId: '1',
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-15'),
    dueDate: new Date('2023-10-20')
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up user authentication system with JWT',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[0],
    projectId: '1',
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-11-10'),
    dueDate: new Date('2023-11-25')
  },
  {
    id: '3',
    title: 'Setup CI/CD Pipeline',
    description: 'Configure automated testing and deployment',
    status: 'todo',
    priority: 'medium',
    assignee: mockUsers[2],
    projectId: '1',
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2023-10-10'),
    dueDate: new Date('2023-12-01')
  },
  {
    id: '4',
    title: 'iOS App Development',
    description: 'Develop native iOS application',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[1],
    projectId: '2',
    createdAt: new Date('2023-09-20'),
    updatedAt: new Date('2023-11-08'),
    dueDate: new Date('2024-01-15')
  },
  {
    id: '5',
    title: 'Android App Development',
    description: 'Develop native Android application',
    status: 'todo',
    priority: 'high',
    assignee: mockUsers[2],
    projectId: '2',
    createdAt: new Date('2023-09-25'),
    updatedAt: new Date('2023-09-25'),
    dueDate: new Date('2024-02-01')
  },
  {
    id: '6',
    title: 'API Integration',
    description: 'Integrate mobile apps with backend APIs',
    status: 'todo',
    priority: 'medium',
    assignee: mockUsers[1],
    projectId: '2',
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-01'),
    dueDate: new Date('2024-02-15')
  },
  {
    id: '7',
    title: 'Data Schema Design',
    description: 'Design new database schema for cloud migration',
    status: 'completed',
    priority: 'high',
    assignee: mockUsers[0],
    projectId: '3',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-09-01'),
    dueDate: new Date('2023-09-15')
  },
  {
    id: '8',
    title: 'Data Migration Scripts',
    description: 'Write scripts to migrate existing data',
    status: 'completed',
    priority: 'high',
    assignee: mockUsers[2],
    projectId: '3',
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-10-15'),
    dueDate: new Date('2023-10-30')
  },
  {
    id: '9',
    title: 'Performance Testing',
    description: 'Test new database performance under load',
    status: 'in-progress',
    priority: 'medium',
    assignee: mockUsers[0],
    projectId: '3',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-11-10'),
    dueDate: new Date('2023-11-25')
  }
];
