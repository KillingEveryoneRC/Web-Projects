import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const [name, setName] = useState("");
    const [experience, setExperience] = useState("");
    const [skills, setSkills] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [experienceJob, setExperienceJob] = useState("");

    // 🔽 Завантаження профілю при вході
    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || "");
                    setExperience(data.experience || "");
                    setSkills(data.skills || "");
                }
            };
            fetchProfile();
        }
    }, [user]);

    // 🔼 Збереження профілю
    const handleSave = async () => {
        if (!user) return;
        try {
            await setDoc(doc(db, "users", user.uid), {
                name,
                experience,
                skills
            });
            alert("Profile updated!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile.");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        alert("You have been logged out.");
        navigate("/login");
    };

    const handleAddVacancy = async () => {
        if (!jobTitle || !company || !salary) {
            alert("Please fill in required fields.");
            return;
        }

        try {
            await addDoc(collection(db, "vacancies"), {
                title: jobTitle,
                company,
                salary,
                location,
                type,
                experience: experienceJob,
                createdBy: user.uid,
                createdAt: serverTimestamp()
            });

            // Reset form
            setJobTitle("");
            setCompany("");
            setSalary("");
            setLocation("");
            setType("");
            setExperienceJob("");

            alert("Vacancy added!");
        } catch (err) {
            console.error("Error adding vacancy:", err);
            alert("Failed to add vacancy.");
        }
    };

    return (
        <div className="profile-section">
            <div className="profile-header">
                <h1>My Profile</h1>
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    {isEditing ? (
                        <>
                            <label>Name:</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} />

                            <label>Experience:</label>
                            <input
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />

                            <label>Skills:</label>
                            <input
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />

                            <button className="button" onClick={handleSave}>
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <h2>{name || "Unnamed User"}</h2>
                            <p><strong>Experience:</strong> {experience || "—"}</p>
                            <p><strong>Skills:</strong> {skills || "—"}</p>
                            <button className="button" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </button>
                        </>
                    )}

                    <button className="button logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            {/* Add Vacancy Form */}
            <div className="add-vacancy">
                <h3>Add New Vacancy</h3>
                <input
                    placeholder="Job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    placeholder="Salary ($)"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    placeholder="Type (Online/Offline)"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <input
                    placeholder="Experience"
                    value={experienceJob}
                    onChange={(e) => setExperienceJob(e.target.value)}
                />

                <button className="button" onClick={handleAddVacancy}>
                    Submit Vacancy
                </button>
            </div>
        </div>
    );
};

export default Profile;
