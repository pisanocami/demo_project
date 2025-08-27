
import React from 'react';
import { User, Bell, Shield, Palette, Database, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/components/ui/Avatar';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const Settings: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      description: 'Manage your personal information and preferences',
      items: [
        { label: 'Personal Information', value: 'Update your name, email, and avatar' },
        { label: 'Password', value: 'Change your account password' },
        { label: 'Language', value: 'English (US)' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure how you receive notifications',
      items: [
        { label: 'Email Notifications', value: 'Enabled' },
        { label: 'Push Notifications', value: 'Enabled' },
        { label: 'Weekly Summary', value: 'Enabled' }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your privacy and security settings',
      items: [
        { label: 'Two-Factor Authentication', value: 'Disabled' },
        { label: 'Data Export', value: 'Download your data' },
        { label: 'Account Deletion', value: 'Permanently delete account' }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel of your workspace',
      items: [
        { label: 'Theme', value: 'Light' },
        { label: 'Sidebar Position', value: 'Left' },
        { label: 'Compact Mode', value: 'Disabled' }
      ]
    },
    {
      title: 'Data Management',
      icon: Database,
      description: 'Manage your projects and tasks data',
      items: [
        { label: 'Export Projects', value: 'Download as JSON' },
        { label: 'Import Data', value: 'Upload from file' },
        { label: 'Reset Data', value: 'Clear all projects and tasks' }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <Breadcrumbs items={[{ label: 'Settings' }]} />
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* User Profile Section */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar src={user?.avatar} name={user?.name} size="lg" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500">Account created on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary">Edit Profile</button>
          <button 
            onClick={handleLogout}
            className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <section.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            </div>
            <div className="space-y-3">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.value}</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="card border-red-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
            <p className="text-sm text-red-600">Irreversible actions that affect your account</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Delete Account</p>
              <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
