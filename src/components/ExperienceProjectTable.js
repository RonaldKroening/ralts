import React from 'react';
import './stylesheets/ExperienceProjectTable.css';

const ExperienceProjectTable = ({ title, data, type }) => {
    return (
        <div className="table-container data-table">
            <table className="table">
                <thead>
                    <tr>
                        <th>{title}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className={`item-container ${type}`}>
                                    {type === 'education' ? (
                                        <>
                                            <div className="education-header">
                                                <strong>{item.University}</strong> <span>{item.GradDate}</span>
                                            </div>
                                            <div className="education-subheader">
                                                <i>{item['Degree Type']} in {item.Major}</i> <span>{item.location}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="item-header">
                                                <strong>{type === 'experience' ? `${item.Job} at ${item.company}` : item.name}</strong> <span>{type === 'experience' ? `${item.start} - ${item.end}` : item.date}</span>
                                            </div>
                                            <div className="item-description">
                                                {item.description}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExperienceProjectTable;
