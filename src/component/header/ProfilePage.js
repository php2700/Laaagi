// import React, { useState, useEffect } from 'react';
// import './ProfilePage.css'; 
// import laaagiLogo from '../../assets/logo.png'; 


// export const ProfilePage = () => {
//     const [userData, setUserData] = useState({
//         name: 'Ram Kam', 
//         email: 'ram.kam@example.com', 
//         memberSince: 'January 1, 2023', 
//         bio: 'Passionate about creating memorable events. Looking forward to planning with Laaagi!', // Example Bio
//     });

//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
        
//         setFormData(userData);
//     }, []); 
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleEditToggle = () => {
//         if (isEditing) {
//             console.log("Saving data:", formData);
//             setUserData(formData); 
//         } else {
//             setFormData(userData);
//         }
//         setIsEditing(!isEditing);
//     };

//     const handleCancelEdit = () => {
//         setIsEditing(false);
//     }

//     return (
//         <div className="profile-page-container">
//             <h1>My Profile</h1>

//             <div className="profile-card">
//                 <div className="profile-avatar-section">
//                     <img
//                         src={userData.avatar || laaagiLogo} 
//                         alt={`${userData.name}'s avatar`}
//                         className="profile-avatar"
//                     />
//                     {isEditing && (
//                         <button className="change-avatar-button">Change Photo</button>
//                      )}
//                 </div>

//                 <div className="profile-details-section">
//                     {isEditing ? (
//                         <form className="profile-edit-form">
//                             <div className="form-group">
//                                 <label htmlFor="name">Name:</label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     value={formData.name || ''}
//                                     onChange={handleInputChange}
//                                 />
//                             </div>
//                              <div className="form-group">
//                                 <label htmlFor="email">Email:</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={formData.email || ''}
//                                     onChange={handleInputChange}
//                                     readOnly 
//                                 />
//                             </div>
//                              <div className="form-group">
//                                 <label htmlFor="bio">Bio:</label>
//                                 <textarea
//                                     id="bio"
//                                     name="bio"
//                                     rows="4"
//                                     value={formData.bio || ''}
//                                     onChange={handleInputChange}
//                                 ></textarea>
//                             </div>
//                         </form>
//                     ) : (
//                         <>
//                             <h2 className="profile-name">{userData.name}</h2>
//                             <p className="profile-email">{userData.email}</p>
//                             <div className="profile-info">
//                                 <p><strong>Member Since:</strong> {userData.memberSince}</p>
//                                 {userData.bio && <p className="profile-bio"><strong>Bio:</strong> {userData.bio}</p>}
//                             </div>
//                         </>
//                     )}

//                     <div className="profile-actions">
//                         <button onClick={handleEditToggle} className="edit-profile-button">
//                             {isEditing ? 'Save Changes' : 'Edit Profile'}
//                         </button>
//                         {isEditing && (
//                              <button onClick={handleCancelEdit} className="cancel-edit-button">
//                                 Cancel
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
import React, { useState } from 'react';
import './ProfilePage.css'; 
import laaagiLogo from '../../assets/logo.png'; 
export const ProfilePage = () => {
   
    const [formData, setFormData] = useState({
        name: '',         
        email: '', 
        mobile : '',       
        location: '',     
        bio: '',          
        avatarUrl: laaagiLogo 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Updating profile with:", formData);
        alert("Profile update submitted (check console). Implement API call.");
    };

    const handleAvatarChange = (e) => {
    };

    return (
        <div className="account-profile-page">
            <div className="profile-header-banner">
                <h1> Profile</h1>
            </div>

            <div className="profile-content">
                <div className="avatar-section">
                    <img
                        src={formData.avatarUrl || laaagiLogo}
                        alt="User Avatar"
                        className="profile-avatar"
                    />
                </div>

                <form onSubmit={handleUpdate} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}      
                            onChange={handleInputChange}
                            placeholder="DB vertex TEchnologies" 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}      
                            onChange={handleInputChange}
                            placeholder="DBvertex@gmail.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Mobile" className="form-label">Mobile</label>
                        <input
                            type="Mobile"
                            id="Mobile"
                            name="Mobile"
                            className="form-input"
                            value={formData.mobile}      
                            onChange={handleInputChange}
                            placeholder="8225033135"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="form-input"
                            value={formData.location}   y
                            onChange={handleInputChange}
                            placeholder="Hyderabad, India"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            className="form-textarea"
                            rows="4"
                            value={formData.bio}        
                            onChange={handleInputChange}
                            placeholder="Tell us a little about yourself" 
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="update-button">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// third file
// import React, { useState, useEffect } from 'react'; // Make sure useEffect is imported
// import './ProfilePage.css';
// import laaagiLogo from '../../assets/logo.png';

// export const ProfilePage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         location: '',
//         bio: '',
//         avatarUrl: laaagiLogo
//     });
//     const [isLoading, setIsLoading] = useState(true); // Optional: for loading state
//     const [error, setError] = useState(null);       // Optional: for error handling

//     // --- API Call for Fetching Data ---
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             setIsLoading(true); // Start loading
//             setError(null);
//             try {
//                 // Replace with your actual API endpoint URL
//                 const response = await fetch('/api/user/profile'); // GET request by default

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const userData = await response.json();

//                 // Update state with fetched data, providing fallbacks
//                 setFormData({
//                     name: userData.name || '',
//                     email: userData.email || '',
//                     mobile: userData.mobile || '',
//                     location: userData.location || '',
//                     bio: userData.bio || '',
//                     avatarUrl: userData.avatarUrl || laaagiLogo // Use fetched avatar or default
//                 });

//             } catch (e) {
//                 console.error("Error fetching profile:", e);
//                 setError("Failed to load profile data."); // Set error message for UI
//             } finally {
//                 setIsLoading(false); // Stop loading regardless of success/failure
//             }
//         };

//         fetchUserProfile(); // Call the function to fetch data

//     }, []); // Empty dependency array means run once on mount

//     // ... rest of your component (handlers, return statement) ...

//     const handleUpdate = async (e) => { // Make the handler async
//         e.preventDefault();
//         console.log("Attempting to update profile with:", formData);
//         // Add loading/disabled state to button here if desired

//         try {
//             // --- API Call for Updating Data ---
//             // Replace with your actual API endpoint URL
//             const response = await fetch('/api/user/profile', {
//                 method: 'PUT', // Or 'POST' or 'PATCH' depending on your API design
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Include authorization headers if needed (e.g., JWT token)
//                     // 'Authorization': `Bearer ${yourAuthToken}`
//                 },
//                 body: JSON.stringify(formData) // Send the current form data
//             });

//             if (!response.ok) {
//                 // Handle server-side errors (e.g., validation errors)
//                 const errorData = await response.json(); // Or response.text()
//                 throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//             }

//             const updatedUserData = await response.json(); // Optional: backend might return the updated user
//             console.log("Profile updated successfully:", updatedUserData);
//             alert("Profile updated successfully!");

//             // Optionally update state again if the backend returns slightly different data
//             // setFormData(prev => ({ ...prev, ...updatedUserData }));

//         } catch (error) {
//             console.error("Error updating profile:", error);
//             alert(`Failed to update profile: ${error.message}`);
//         } finally {
//              // Remove loading/disabled state from button here
//         }
//     };

//     // ... (handleInputChange, return statement remains largely the same) ...
//     // You might want to display the `isLoading` and `error` states in your JSX

//    return (
//        <div className="account-profile-page">
//            {/* ... header ... */}
//            <div className="profile-content">
//                 {/* ... avatar section ... */}

//                 {isLoading && <p>Loading profile...</p>}
//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//                 {!isLoading && !error && ( // Only show form when not loading and no error
//                     <form onSubmit={handleUpdate} className="profile-form">
//                        {/* ... form groups ... */}
//                        <div className="button-group">
//                            <button type="submit" className="update-button" > {/* Optionally disable during update*/}
//                                Update
//                            </button>
//                        </div>
//                    </form>
//                 )}
//            </div>
//        </div>
//    );
// };