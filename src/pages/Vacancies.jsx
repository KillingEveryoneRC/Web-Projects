import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/vacancies.css";

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        const fetchVacancies = async () => {
            const q = query(collection(db, "vacancies"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setVacancies(data);
        };

        fetchVacancies();
    }, []);

    return (
        <div className="vacancies-section">
            <h2>Vacancies</h2>
            <div className="vacancies-list">
                {vacancies.map((vac) => (
                    <div className="vacancy-card" key={vac.id}>
                        <div className="company-name">{vac.company}</div>
                        <div className="position">{vac.title}</div>
                        <div className="details">
                            <div>💰 {vac.salary}</div>
                            <div>📍 {vac.location}</div>
                            <div>📝 {vac.type}</div>
                            <div>💼 Experience: {vac.experience}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
