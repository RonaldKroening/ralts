import React from 'react';

const TabsDisplay = ({ activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            <div className={`tab ${activeTab === 'Add Exp' ? 'active' : ''}`} onClick={() => setActiveTab('Add Exp')}>Add Exp</div>
            <div className={`tab ${activeTab === 'Data' ? 'active' : ''}`} onClick={() => setActiveTab('Data')}>Data</div>
            <div className={`tab ${activeTab === 'Job' ? 'active' : ''}`} onClick={() => setActiveTab('Job')}>Job</div>
            <div className={`tab ${activeTab === 'Export' ? 'active' : ''}`} onClick={() => setActiveTab('Export')}>Export</div>
        </div>
    );
};

export default TabsDisplay;
