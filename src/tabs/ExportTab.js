import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import './ExportTab.css';

// Mocking the keywords.json content
const keywordsJson = {
    "Python": "programming language",
    "JavaScript": "programming language",
    "React": "framework",
    "Node.js": "runtime environment",
    "Django": "framework",
    "Flask": "framework"
};

const ExportTab = ({ projects, education, experiences, contactInfo }) => {
    const [allExperiences, setAllExperiences] = useState([]);
    const [keywordsDict, setKeywordsDict] = useState({});
    const [keywordsArray, setKeywordsArray] = useState([]);
    const [latexContent, setLatexContent] = useState('');
    const [chosenExperiences, setChosenExperiences] = useState([]);

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

    useEffect(() => {
        // Generate LaTeX content when the component mounts
        const title = ""; // You can set the title based on the user input or other logic
        const description = ""; // You can set the description based on the user input or other logic
        const rankedExperiences = rankExperiences(title, description);
        setChosenExperiences(rankedExperiences);
        const latex = generateLaTeXContent(contactInfo, education, rankedExperiences);
        setLatexContent(latex);
    }, [allExperiences]);

    const rankExperiences = (title, description) => {
        const jobDescription = description.toLowerCase();
        const rankedExperiences = allExperiences.map(exp => {
            let score = exp.company ? 1.0 : 0.5;

            // Check for keyword matches in the description and tags
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

        return rankedExperiences;
    };

    const generateLaTeXContent = (contactInfo, education, rankedExperiences) => {
        const headcont = `
\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}
\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}
\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
\\pdfgentounicode=1
\\newcommand{\\resumeItem}[1]{\\item\\small{#1 \\vspace{-2pt}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[3]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{\\vcenter{\\hbox{\\tiny$\\bullet$}}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
\\begin{document}
\\begin{center}
    \\textbf{\\Huge \\scshape ${contactInfo.name}} \\\\ \\vspace{1pt}
    \\small \\href{mailto:${contactInfo.email}}{\\underline{${contactInfo.email}}} $|$ 
    \\href{https://${contactInfo.linkedin}}{\\underline{${contactInfo.linkedin}}} $|$
    \\href{https://${contactInfo.github}}{\\underline{${contactInfo.github}}}
\\end{center}
`;

        const generateEducationSection = (education) => {
            let latex = "\\section{Education}\\resumeSubHeadingListStart\n";
            education.forEach(edu => {
                latex += `\\resumeSubheading
  {${edu.school}}{${edu.location}}
  {${edu.degreeType} in ${edu.major}}{${edu.date}}
`;
            });
            latex += "\\resumeSubHeadingListEnd\n";
            return latex;
        };

        const generateExperienceSection = (experiences) => {
            let latex = "\\section{Experience}\\resumeSubHeadingListStart\n";
            experiences.forEach(exp => {
                latex += `\\resumeSubheading
  {${exp.Job || exp.name}}{${exp.start} - ${exp.end}}
  {${exp.company || ''}}{}
`;
                latex += "\\resumeItemListStart\n";
                exp.description.split('. ').forEach(item => {
                    if (item) latex += `\\resumeItem{${item}}\n`;
                });
                latex += "\\resumeItemListEnd\n";
            });
            latex += "\\resumeSubHeadingListEnd\n";
            return latex;
        };

        return `${headcont}
${generateEducationSection(education)}
${generateExperienceSection(rankedExperiences)}
\\end{document}`;
    };

    const generateFolder = () => {
        const title = ""; // You can set the title based on the user input or other logic
        const description = ""; // You can set the description based on the user input or other logic
        const rankedExperiences = rankExperiences(title, description);

        const latexContent = generateLaTeXContent(contactInfo, education, rankedExperiences);
        setLatexContent(latexContent);

        // Save each JSON object as a file in the folder
        const projectsBlob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
        const educationBlob = new Blob([JSON.stringify(education, null, 2)], { type: 'application/json' });
        const experiencesBlob = new Blob([JSON.stringify(experiences, null, 2)], { type: 'application/json' });
        const contactInfoBlob = new Blob([JSON.stringify(contactInfo, null, 2)], { type: 'application/json' });
        const rankedExperiencesBlob = new Blob([JSON.stringify(rankedExperiences, null, 2)], { type: 'application/json' });
        const latexBlob = new Blob([latexContent], { type: 'application/x-latex' });

        const zip = new JSZip();
        zip.file('projects.json', projectsBlob);
        zip.file('education.json', educationBlob);
        zip.file('experiences.json', experiencesBlob);
        zip.file('contactInfo.json', contactInfoBlob);
        zip.file('rankedExperiences.json', rankedExperiencesBlob);
        zip.file('resume.tex', latexBlob);

        zip.generateAsync({ type: "blob" })
            .then(content => {
                saveAs(content, "exportedData.zip");
            });
    };

    const copyLatexToClipboard = () => {
        navigator.clipboard.writeText(latexContent).then(() => {
            alert("LaTeX content copied to clipboard!");
        }, () => {
            alert("Failed to copy LaTeX content to clipboard.");
        });
    };

    return (
        <div>
            <button className="exp-button" onClick={generateFolder}>Export Data</button>
            <button className="exp-button" onClick={copyLatexToClipboard} >Copy LaTeX to Clipboard</button>
        </div>
    );
};

export default ExportTab;
