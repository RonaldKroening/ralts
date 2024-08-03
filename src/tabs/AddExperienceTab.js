import React, { useState } from 'react';

const AddExperienceTab = ({ projects, setProjects, education, setEducation, experiences, setExperiences, contactInfo, setContactInfo }) => {
    const [type, setType] = useState('job');
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [school, setSchool] = useState('');
    const [degreeType, setDegreeType] = useState('');
    const [major, setMajor] = useState('');
    const [gpa, setGpa] = useState('');
    const [location, setLocation] = useState('');
    const [graduationMonth, setGraduationMonth] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [name, setName] = useState(contactInfo.name || '');
    const [email, setEmail] = useState(contactInfo.email || '');
    const [linkedin, setLinkedin] = useState(contactInfo.linkedin || '');
    const [github, setGithub] = useState(contactInfo.github || '');
    const [portfolio, setPortfolio] = useState('');

    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const degreeTypes = [
        'GED',
        'Associate of Arts',
        'Associate of Science',
        'Bachelors of Arts',
        'Bachelors of Science',
        'Masters of Arts',
        'Masters of Science',
        'Doctorate',
    ];

    const majors = [
        'Computer Science',
        'Business',
        'Engineering',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Economics',
        'Psychology',
        'Sociology',
        'History',
        'English',
        'Political Science',
    ];

    const handleSubmit = () => {
        if (type === 'education') {
            const newEducation = {
                school,
                location,
                degreeType,
                major,
                date: `${graduationMonth} ${graduationYear}`,
                gpa: gpa || null
            };
            setEducation([...education, newEducation]);
        } else if (type === 'project') {
            const newProject = {
                name: title,
                date: '',
                description
            };
            setProjects([...projects, newProject]);
        } else if (type === 'job') {
            const newExperience = {
                Job: title,
                company: company,
                start: '',
                end: '',
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
            <div className="type-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                    <label htmlFor="type-select">TYPE</label>
                    <select id="type-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="job">Job</option>
                        <option value="project">Project</option>
                        <option value="education">Education</option>
                        <option value="info">Info</option>
                    </select>
                </div>
                <div className="form-group">
                    <input 
                        type="file" 
                        id="folder-upload" 
                        webkitdirectory="true" 
                        directory="true" 
                        multiple 
                        onChange={handleFolderUpload} 
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            {type === 'education' ? (
                <>
                    <div className="form-group">
                        <label htmlFor="degree-type-select">Degree Type</label>
                        <select id="degree-type-select" value={degreeType} onChange={(e) => setDegreeType(e.target.value)}>
                            <option value="">Select degree type</option>
                            {degreeTypes.map((degree, index) => (
                                <option key={index} value={degree}>{degree}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="major-select">Major</label>
                        <select id="major-select" value={major} onChange={(e) => setMajor(e.target.value)}>
                            <option value="">Select major</option>
                            {majors.map((major, index) => (
                                <option key={index} value={major}>{major}</option>
                            ))}
                        </select>
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
                        <label htmlFor="graduation-month-select">Graduation Month</label>
                        <select id="graduation-month-select" value={graduationMonth} onChange={(e) => setGraduationMonth(e.target.value)}>
                            <option value="">Select month</option>
                            {months.map((month, index) => (
                                <option key={index} value={month.label}>{month.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="graduation-year-input">Graduation Year</label>
                        <input type="text" id="graduation-year-input" placeholder="Add year" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
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
                        {type === 'job' && (
                            <div className="form-group">
                                <label htmlFor="company-input">Add Company</label>
                                <input type="text" id="company-input" placeholder="Add text" value={company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                        )}
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
