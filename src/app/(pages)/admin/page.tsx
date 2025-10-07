'use client';

import { useState } from 'react';
import { 
  FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiUser, FiBriefcase, 
  FiBook, FiLink, FiFolder, FiTag, FiGithub, FiGlobe, FiFileText,
  FiCalendar, FiMapPin, FiAward, FiTrendingUp
} from 'react-icons/fi';
import AboutMeSection from '@/components/adminComponent/AboutMeSections';
import SkillsSection from '@/components/adminComponent/SkillsSections';
import ExperienceSection from '@/components/adminComponent/ExperienceSection';
import EducationSection from '@/components/adminComponent/EducationSection';
import SocialLinksSection from '@/components/adminComponent/SocialLinkSections';
import ProjectsSection from '@/components/adminComponent/ProjectSection';

type Tab = 'about' | 'skills' | 'experience' | 'education' | 'social' | 'projects';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('about');

  const tabs = [
    { id: 'about', label: 'About Me', icon: FiUser },
    { id: 'skills', label: 'Skills', icon: FiTrendingUp },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'education', label: 'Education', icon: FiBook },
    { id: 'social', label: 'Social Links', icon: FiLink },
    { id: 'projects', label: 'Projects', icon: FiFolder }
  ];

  return (
    <div className="min-h-screen ">
      <div className="border-b border-border shadow-sm pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your portfolio content</p>
          </div>
        </div>
      </div>

      <div className="border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'about' && <AboutMeSection />}
        {activeTab === 'skills' && <SkillsSection />}
        {activeTab === 'experience' && <ExperienceSection />}
        {activeTab === 'education' && <EducationSection />}
        {activeTab === 'social' && <SocialLinksSection />}
        {activeTab === 'projects' && <ProjectsSection />}
      </div>
    </div>
  );
}

