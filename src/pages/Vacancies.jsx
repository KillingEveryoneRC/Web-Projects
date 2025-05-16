import React, { useState } from "react";
import vacanciesData from "../data/vacancies";
import JobCard from "../components/JobCard";

const Vacancies = () => {
    const [vacancies, setVacancies] = useState(vacanciesData);

    const sortByDate = () => {
        const sorted = [...vacancies].sort((a, b) => new Date(b.date) - new Date(a.date));
        setVacancies(sorted);
    };

    const sortBySalary = () => {
        const sorted = [...vacancies].sort((a, b) => {
            const salaryA = parseInt(a.salary.replace(/\$/g, ""));
            const salaryB = parseInt(b.salary.replace(/\$/g, ""));
            return salaryB - salaryA; // Більша зарплата перша
        });
        setVacancies(sorted);
    };

    const sortByExperience = () => {
        const getYears = (experience) => {
            if (experience.toLowerCase() === "none") return 0;
            return parseInt(experience);
        };

        const sorted = [...vacancies].sort((a, b) => getYears(b.experience) - getYears(a.experience));
        setVacancies(sorted);
    };

    return (
        <div className="vacancies-section">
            <h2>Вакансії</h2>

            <div className="sort-buttons">
                <button className="button" onClick={sortByDate}>Сортувати за датою</button>
                <button className="button" onClick={sortBySalary}>Сортувати за зарплатою</button>
                <button className="button" onClick={sortByExperience}>Сортувати за досвідом</button>
            </div>

            <div className="vacancies-list">
                {vacancies.map((vacancy) => (
                    <JobCard key={vacancy.id} vacancy={vacancy} />
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
