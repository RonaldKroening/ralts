import React, { useState } from 'react';
import TabsDisplay from './components/TabsDisplay';
import Content from './components/Content';
import AddExperienceTab from './tabs/AddExperienceTab';
import DataTab from './tabs/DataTab';
import JobTab from './tabs/JobTab';
import ExportTab from './tabs/ExportTab';
import './stylesheets/App.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('Data');
    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [contactInfo, setContactInfo] = useState({});

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Add Exp':
                return (
                    <AddExperienceTab 
                        projects={projects}
                        setProjects={setProjects}
                        education={education}
                        setEducation={setEducation}
                        experiences={experiences}
                        setExperiences={setExperiences}
                        contactInfo={contactInfo}
                        setContactInfo={setContactInfo}
                    />
                );
            case 'Data':
                return (
                    <DataTab 
                        projects={projects}
                        setProjects={setProjects}
                        education={education}
                        setEducation={setEducation}
                        experiences={experiences}
                        setExperiences={setExperiences}
                        contactInfo={contactInfo}
                        setContactInfo={setContactInfo}
                    />
                );
            case 'Job':
                return (
                    <JobTab 
                        experiences={experiences}
                        projects={projects}
                    />
                );
            case 'Export':
                return (
                    <ExportTab 
                        projects={projects}
                        education={education}
                        experiences={experiences}
                        contactInfo={contactInfo}
                    />
                );
            default:
                return (
                    <DataTab 
                        projects={projects}
                        education={education}
                        experiences={experiences}
                        setProjects={setProjects}
                        setEducation={setEducation}
                        setExperiences={setExperiences}
                        setContactInfo={setContactInfo}
                    />
                );
        }
    };

    return (
        <div className="container">
            <TabsDisplay activeTab={activeTab} setActiveTab={setActiveTab} />
            <Content>
                {renderTabContent()}
            </Content>
        </div>
    );
};

export default App;
