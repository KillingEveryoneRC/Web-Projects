import React, { useState } from "react";
import vacanciesData from "../data/vacancies";
import JobCard from "../components/JobCard";

const Vacancies = () => {
    const [vacancies, setVacancies] = useState(vacanciesData);

    const sortByDate = () => {
        const sorted = [...vacancies].sort((a, b) => new Date(b.date) - new Date(a.date));
        setVacancies(sorted);
    };

    return (
        <div className="vacancies-section">
            <h2>Вакансії</h2>
            <button className="button" onClick={sortByDate}>Сортувати за датою</button>
            <div className="vacancies-list">
                {vacancies.map((vacancy) => (
                    <JobCard key={vacancy.id} vacancy={vacancy} />
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
