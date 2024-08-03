const keywords = {
    "Python": "Programming Languages",
    "Java": "Programming Languages",
    "JavaScript": "Programming Languages",
    "C++": "Programming Languages",
    "HTML": "Programming Languages",
    "React": "Frameworks",
    "Django": "Frameworks",
    "TensorFlow": "Frameworks",
    "Machine Learning": "Methodologies",
    "Data Analysis": "Methodologies",
    "AWS": "Software Solutions",
    "Google APIs": "Software Solutions"
    // Add all other keywords here...
};

const categories = {
    "Programming Languages": new Set(),
    "Frameworks": new Set(),
    "Methodologies": new Set(),
    "Software Solutions": new Set()
};

function extractSkills(description, tags, keywords, categories) {
    const words = description.split(/\W+/);
    const allKeywords = words.concat(tags);
    
    allKeywords.forEach(word => {
        if (keywords[word]) {
            categories[keywords[word]].add(word);
        }
    });
}

function generateSkillsSection() {
    let latex = "\\section{Technical Skills}\n    \\begin{itemize}[leftmargin=0.15in, label={}]\n        \\small{\\item{\n";
    
    Object.keys(categories).forEach(category => {
        latex += `            \\textbf{${category}}{: ${Array.from(categories[category]).join(', ')}} \\\\\n`;
    });
    
    latex += "        }}\n    \\end{itemize}\n";
    return latex;
}

function generateExperienceSection(experiences) {
    let latex = "%-----------EXPERIENCE-----------\n\\section{Experience}\n\\resumeSubHeadingListStart\n";
    
    experiences.forEach(exp => {
        latex += `  \\resumeSubheading\n    {${exp.Job}}{${exp.start} -- ${exp.end}}\n    {${exp.company}}{}\n`;
        latex += "    \\resumeItemListStart\n";
        exp.description.split('. ').forEach(item => {
            if (item) latex += `      \\resumeItem{${item}}\n`;
        });
        latex += "    \\resumeItemListEnd\n";
    });
    
    latex += "\\resumeSubHeadingListEnd\n";
    return latex;
}

function generateProjectsSection(projects) {
    let latex = "%-----------PROJECTS-----------\n\\section{Projects}\n\\resumeSubHeadingListStart\n";
    
    projects.forEach(proj => {
        latex += `  \\resumeProjectHeading\n    {${proj.name}}{${proj.date}}\n    {${proj.tags.replace(/&/g, ', ')}}\n`;
        latex += "    \\resumeItemListStart\n";
        proj.description.split('. ').forEach(item => {
            if (item) latex += `      \\resumeItem{${item}}\n`;
        });
        latex += "    \\resumeItemListEnd\n";
    });
    
    latex += "\\resumeSubHeadingListEnd\n";
    return latex;
}

function generateEducationSection(education) {
    let latex = "\\section{Education}\n  \\resumeSubHeadingListStart\n";
    
    education.forEach(edu => {
        latex += `    \\resumeSubheading\n      {${edu.school}}{${edu.location}}\n`;
        latex += `      {${edu.degree}}{${edu.date}}\n`;
    });
    
    latex += "  \\resumeSubHeadingListEnd\n";
    return latex;
}

function generateHeading(contactInfo) {
    return `
\\begin{center}
    \\textbf{\\Huge \\scshape ${contactInfo.name}} \\\\ \\vspace{1pt}
    \\small \\href{mailto:${contactInfo.email}}{\\underline{${contactInfo.email}}} $|$ 
    \\href{https://${contactInfo.linkedin}}{\\underline{${contactInfo.linkedin}}} $|$
    \\href{https://${contactInfo.github}}{\\underline{${contactInfo.github}}}
\\end{center}
`;
}

function create_resume(experiences, projects, contactInfo, education) {
    experiences.forEach(exp => {
        extractSkills(exp.description, exp.tags || [], keywords, categories);
    });

    projects.forEach(proj => {
        extractSkills(proj.description, proj.tags.split('&'), keywords, categories);
    });

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

%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generated pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

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

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
`;
    const bd = '\\begin{document}';
    const ed = '\\end{document}';
    const resume = headcont + bd + generateHeading(contactInfo) + "\n" + generateEducationSection(education) + "\n" + generateExperienceSection(experiences) + "\n" + generateProjectsSection(projects) + "\n" + generateSkillsSection() + ed;
    return resume;
}

export {
    create_resume
};
