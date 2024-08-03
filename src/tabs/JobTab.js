import React, { useState, useEffect } from 'react';

// Mocking the keywords.json content
const keywordsJson = {
    "Python": "programming language",
    "JavaScript": "programming language",
    "React": "framework",
    "Node.js": "runtime environment",
    "Django": "framework",
    "Flask": "framework"
};

const JobTab = ({ experiences, projects }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [showExperiences, setShowExperiences] = useState(false);
    const [allExperiences, setAllExperiences] = useState([]);
    const [topExperiences, setTopExperiences] = useState([]);
    const [keywordsDict, setKeywordsDict] = useState({});
    const [keywordsArray, setKeywordsArray] = useState([]);

    useEffect(() => {
        // Simulating the fetching of keywords.json
        const loadKeywords = () => {
            const dict = keywordsJson;
            const array = Object.keys(dict);
            setKeywordsDict(dict);
            setKeywordsArray(array);
        };

        loadKeywords();

        // Combine jobs and projects into a single array
        const combinedExperiences = [...experiences, ...projects];
        setAllExperiences(combinedExperiences);
    }, [experiences, projects]);

    const rankExperiences = () => {
        const jobDescription = description.toLowerCase();
        const rankedExperiences = allExperiences.map(exp => {
            let score = exp.company ? 1.0 : 0.5;

            // Check for keyword matches in the description
            keywordsArray.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                if (regex.test(exp.description) || (exp.tags && exp.tags.includes(keyword))) {
                    score += 0.15;
                }
            });

            // Check for matches in tags with the job description
            if (exp.tags) {
                exp.tags.forEach(tag => {
                    if (jobDescription.includes(tag.toLowerCase())) {
                        score += 0.15;
                    }
                });
            }

            // Check for perfect job title match for jobs
            if (exp.company && exp.Job === title) {
                score += 1.0;
            }

            return { ...exp, score };
        }).sort((a, b) => b.score - a.score);

        setTopExperiences(rankedExperiences.slice(0, 5));
    };

    const handleShowExperiences = () => {
        rankExperiences();
        setShowExperiences(true);
    };

    return (
        <div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="job-title-input">Add Title</label>
                    <input type="text" id="job-title-input" placeholder="Add text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="job-company-input">Add Company</label>
                    <input type="text" id="job-company-input" placeholder="Add text" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="job-description-input">Add Description</label>
                <textarea id="job-description-input" placeholder="Add text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button onClick={handleShowExperiences}>Pick Best Experiences</button>
            {showExperiences && (
                <div className="experience-container">
                    {topExperiences.map((exp, index) => (
                        <div className="experience-box" key={index}>
                            <div className="experience-header">{exp.company ? 'Experience' : 'Project'} {index + 1} (Score: {exp.score.toFixed(2)})</div>
                            <div><strong>Title:</strong> {exp.company ? exp.Job : exp.name}</div>
                            {exp.company && <div><strong>Company:</strong> {exp.company}</div>}
                            <div><strong>Description:</strong> {exp.description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobTab;


