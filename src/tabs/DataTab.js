import React, { useState } from 'react';
import ExperienceProjectTable from '../components/ExperienceProjectTable';

const DataTab = ({ projects, setProjects, education, setEducation, experiences, setExperiences, contactInfo, setContactInfo }) => {
    const dataManage = (files) => {
        // Function to process the folder and load previous data
        for (let file of files) {
            if (file.type === 'application/json') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = JSON.parse(event.target.result);
                    if (file.name.includes('jobs')) {
                        setExperiences(data);
                    } else if (file.name.includes('projects')) {
                        setProjects(data);
                    } else if (file.name.includes('education')) {
                        setEducation(data);
                    } else if (file.name.includes('contact')) {
                        setContactInfo(data);
                    }
                };
                reader.readAsText(file);
            }
        }
    };

    const handleFolderUpload = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            dataManage(files);
        }
    };

    return (
        <div>
            <label style={{ fontSize: '12px' }}>If you’ve used RALTS before, simply drop the folder that says “YourName-RALTS”</label>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10%' }}>
                <input 
                    type="file" 
                    id="file-upload" 
                    webkitdirectory="true" 
                    directory="true" 
                    multiple 
                    onChange={handleFolderUpload} 
                    style={{ display: 'none' }}
                />
                <button 
                    className="data-btn" 
                    style={{ width: '200px', marginRight: '10px' }}
                    onClick={() => document.getElementById('file-upload').click()}
                >
                    Import Files from JSON
                </button>
            </div>
            <ExperienceProjectTable title="Experience" data={experiences} type="experience" />
            <ExperienceProjectTable title="Projects" data={projects} type="project" />
            <ExperienceProjectTable title="Education" data={education} type="education" />
        </div>
    );
};

export default DataTab;
