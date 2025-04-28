import React from "react";
import "../App.css";

const JobCard = ({ vacancy }) => {
    return (
        <div className="vacancy-card">
            <div className="company-name">{vacancy.company}</div>
            <div className="position">{vacancy.position}</div>
            <div className="details">
                <div>💰 {vacancy.salary}</div>
                <div>📍 {vacancy.country}</div>
                <div>📝 {vacancy.type}</div>
                <div>💼 Experience: {vacancy.experience}</div>
            </div>
        </div>
    );
};

export default JobCard;
