import React from 'react';

const TabsDisplay = ({ activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            <button 
                className={activeTab === 'Data' ? 'active' : ''} 
                onClick={() => setActiveTab('Data')}
            >
                Data
            </button>
            <button 
                className={activeTab === 'Add Exp' ? 'active' : ''} 
                onClick={() => setActiveTab('Add Exp')}
            >
                Add Experience
            </button>
            <button 
                className={activeTab === 'Job' ? 'active' : ''} 
                onClick={() => setActiveTab('Job')}
            >
                Job
            </button>
            <button 
                className={activeTab === 'Export' ? 'active' : ''} 
                onClick={() => setActiveTab('Export')}
            >
                Export
            </button>
        </div>
    );
};

export default TabsDisplay;
