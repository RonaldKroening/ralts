import React, { useState } from 'react';

const AddExperienceTab = ({
    projects, setProjects,
    education, setEducation,
    experiences, setExperiences,
    contactInfo, setContactInfo
}) => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [degree, setDegree] = useState('');
    const [school, setSchool] = useState('');
    const [gpa, setGpa] = useState('');
    const [location, setLocation] = useState('');
    const [graduationDate, setGraduationDate] = useState('');
    const [name, setName] = useState(contactInfo.name || '');
    const [email, setEmail] = useState(contactInfo.email || '');
    const [linkedin, setLinkedin] = useState(contactInfo.linkedin || '');
    const [github, setGithub] = useState(contactInfo.github || '');
    const [portfolio, setPortfolio] = useState('');

    const handleSubmit = () => {
        if (type === 'education') {
            const newEducation = {
                school,
                location,
                degree,
                date: graduationDate,
                gpa: gpa || null
            };
            setEducation([...education, newEducation]);
        } else if (type === 'project') {
            const newProject = {
                name: title,
                date,
                description
            };
            setProjects([...projects, newProject]);
        } else if (type === 'work') {
            const newExperience = {
                Job: title,
                company,
                start: date,
                description
            };
            setExperiences([...experiences, newExperience]);
        } else if (type === 'info') {
            const newContactInfo = {
                name,
                email,
                linkedin,
                github,
                portfolio
            };
            setContactInfo(newContactInfo);
        }
    };

    const loadFolder = (directory) => {
        // Function to process the directory and load previous data
        console.log("Folder loaded:", directory);
        // Here, you should add the logic to read the files from the directory and update the states accordingly
    };

    const handleFolderUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const directory = files;
            loadFolder(directory);
        }
    };

    return (
        <div>
            <div className="type-row">
                <div className="form-group">
                    <label htmlFor="type-select">TYPE</label>
                    <select id="type-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Select type</option>
                        <option value="project">Project</option>
                        <option value="work">Work</option>
                        <option value="education">Education</option>
                        <option value="info">Info</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="folder-upload" className="import-label">Import Previous Data</label>
                    <input 
                        type="file" 
                        id="folder-upload" 
                        webkitdirectory="true" 
                        directory="true" 
                        multiple 
                        onChange={handleFolderUpload} 
                        style={{ display: 'none' }}
                    />
                    <button onClick={() => document.getElementById('folder-upload').click()}>Import Previous Data</button>
                </div>
            </div>
            {type === 'education' ? (
                <>
                    <div className="form-group">
                        <label htmlFor="degree-input">Add Degree Type</label>
                        <input type="text" id="degree-input" placeholder="Add degree type" value={degree} onChange={(e) => setDegree(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="school-input">Add School</label>
                        <input type="text" id="school-input" placeholder="Add school" value={school} onChange={(e) => setSchool(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gpa-input">Add GPA (optional)</label>
                        <input type="text" id="gpa-input" placeholder="Add GPA" value={gpa} onChange={(e) => setGpa(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location-input">Add Location</label>
                        <input type="text" id="location-input" placeholder="Add location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="graduation-date-input">Add Graduation Date</label>
                        <input type="date" id="graduation-date-input" value={graduationDate} onChange={(e) => setGraduationDate(e.target.value)} />
                    </div>
                </>
            ) : type === 'info' ? (
                <>
                    <div className="form-group">
                        <label htmlFor="name-input">Name</label>
                        <input type="text" id="name-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email-input">Email</label>
                        <input type="email" id="email-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkedin-input">LinkedIn</label>
                        <input type="text" id="linkedin-input" placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="github-input">GitHub</label>
                        <input type="text" id="github-input" placeholder="GitHub" value={github} onChange={(e) => setGithub(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="portfolio-input">Portfolio</label>
                        <input type="text" id="portfolio-input" placeholder="Portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
                    </div>
                </>
            ) : (
                <>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title-input">Add Title</label>
                            <input type="text" id="title-input" placeholder="Add text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        {type === 'work' && (
                            <div className="form-group">
                                <label htmlFor="company-input">Add Company</label>
                                <input type="text" id="company-input" placeholder="Add text" value={company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="date-input">Add Date</label>
                        <input type="date" id="date-input" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description-input">Add Description</label>
                        <textarea id="description-input" placeholder="Add text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </>
            )}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default AddExperienceTab;
