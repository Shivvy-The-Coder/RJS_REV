// import React, { useState ,useEffect ,useContext} from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AppContext } from '../context/AppContext.jsx';

// const Dashboard = () => {
//   const { backendUrl, userData, getUserData } = useContext(AppContext);

//   // Personal Info states
//   const [bio, setBio] = useState('');
//   const [goals, setGoals] = useState('');

//   // Skills states
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState({ name: '', proficiency: '', hoursSpent: '' });
//   const [editingSkill, setEditingSkill] = useState(null);
//   const [editSkillData, setEditSkillData] = useState({ name: '', proficiency: '', hoursSpent: '' });

//   // Fetch personal info and skills
//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/data`);
//       if (data.success) {
//         setBio(data.userData.bio || '');
//         setGoals(data.userData.goals || '');
//         setSkills(data.userData.skills || []);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error fetching data.',error.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Update personal info
//   const updatePersonalInfo = async () => {
//     try {
//       const { data } = await axios.put(`${backendUrl}/api/user/personal-info`, { bio, goals });
//       if (data.success) {
//         toast.success('Personal info updated!');
//         getUserData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error updating personal info.', error.message);
//     }
//   };

//   // Add new skill
//   const addSkill = async () => {
//     if (!newSkill.name || !newSkill.proficiency || !newSkill.hours) {
//       return toast.warn('Fill all skill fields.');
//     }

//     try {
//       const { data } = await axios.post(`${backendUrl}/api/skill/add`, newSkill);
//       if (data.success) {
//         toast.success('Skill added!');
//         setNewSkill({ name: '', proficiency: '', hours: '' });
//         fetchData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error adding skill.' , error.message);
//     }
//   };

//   // Delete skill
//   const deleteSkill = async (id) => {
//     try {
//       const { data } = await axios.delete(`${backendUrl}/api/skill/delete/${id}`);
//       if (data.success) {
//         toast.success('Skill deleted!');
//         fetchData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error deleting skill.',error.message);
//     }
//   };

//   // Update skill
//   const updateSkill = async (id) => {
//     if (!editSkillData.name || !editSkillData.proficiency || !editSkillData.hours) {
//       return toast.warn('Fill all skill fields.');
//     }

//     try {
//       const { data } = await axios.put(`${backendUrl}/api/skill/update/${id}`, editSkillData);
//       if (data.success) {
//         toast.success('Skill updated!');
//         setEditingSkill(null);
//         setEditSkillData({ name: '', proficiency: '', hours: '' });
//         fetchData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error updating skill.', error.message);
//     }
//   };

//   // Start editing a skill
//   const startEditingSkill = (skill) => {
//     setEditingSkill(skill._id);
//     setEditSkillData({
//       name: skill.name,
//       proficiency: skill.proficiency,
//       hours: skill.hours
//     });
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingSkill(null);
//     setEditSkillData({ name: '', proficiency: '', hours: '' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Welcome Header with User Info */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center space-x-6 mb-6 md:mb-0">
//               <div className="relative">
//                 <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//                   <span className="text-white text-2xl font-bold">
//                     {userData?.name?.charAt(0) || 'U'}
//                   </span>
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                   Welcome, {userData?.name || 'User'}
//                 </h1>
//                 <div className="flex items-center text-gray-600 mb-1">
//                   <span className="w-4 h-4 mr-2">📧</span>
//                   <span>{userData?.email || 'user@example.com'}</span>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   Dashboard • Last updated today
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-6">
//               <div className="text-center bg-blue-50 p-4 rounded-xl">
//                 <div className="text-2xl font-bold text-blue-600">{skills.length}</div>
//                 <div className="text-sm text-gray-500">Skills</div>
//               </div>
//               <div className="text-center bg-green-50 p-4 rounded-xl">
//                 <div className="text-2xl font-bold text-green-600">
//                   {skills.reduce((total, skill) => total + parseInt(skill.hours || 0), 0)}
//                 </div>
//                 <div className="text-sm text-gray-500">Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Personal Info Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//             <span className="w-6 h-6 mr-3 text-blue-600">👤</span>
//             Personal Information
//           </h2>
          
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Bio</label>
//               <textarea
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//                 rows="4"
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 placeholder="Tell us about yourself..."
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Goals</label>
//               <textarea
//                 className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
//                 rows="3"
//                 value={goals}
//                 onChange={(e) => setGoals(e.target.value)}
//                 placeholder="What are your learning goals?"
//               />
//             </div>

//             <button
//               className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//               onClick={updatePersonalInfo}
//             >
//               Update Information
//             </button>
//           </div>
//         </div>

//         {/* Skills Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//             <span className="w-6 h-6 mr-3 text-green-600">🏆</span>
//             Skills Management
//           </h2>

//           {/* Add New Skill Form */}
//           <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8 border border-green-100">
//             <h3 className="font-semibold text-gray-800 mb-4">Add New Skill</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <input
//                 type="text"
//                 placeholder="Skill Name"
//                 className="border-2 border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
//                 value={newSkill.name}
//                 onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Proficiency Level"
//                 className="border-2 border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
//                 value={newSkill.proficiency}
//                 onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
//               />
//               <input
//                 type="number"
//                 placeholder="Hours Spent"
//                 className="border-2 border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
//                 value={newSkill.hoursSpent}
//                 onChange={(e) => setNewSkill({ ...newSkill, hoursSpent: Number(e.target.value )})}
//               />
//               <button
//                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 onClick={addSkill}
                
//               >
//                 Add Skill
//               </button>
//             </div>
//           </div>

//           {/* Skills List */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {skills.map((skill) => (
//               <div
//                 key={skill._id}
//                 className="group border-2 border-gray-200 p-6 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
//               >
//                 {editingSkill === skill._id ? (
//                   // Edit Mode
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       value={editSkillData.name}
//                       onChange={(e) => setEditSkillData({ ...editSkillData, name: e.target.value })}
//                       className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       placeholder="Skill name"
//                     />
//                     <input
//                       type="text"
//                       value={editSkillData.proficiency}
//                       onChange={(e) => setEditSkillData({ ...editSkillData, proficiency: e.target.value })}
//                       className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       placeholder="Proficiency level"
//                     />
//                     <input
//                       type="number"
//                       value={editSkillData.hours}
//                       onChange={(e) => setEditSkillData({ ...editSkillData, hours: e.target.value })}
//                       className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       placeholder="Hours spent"
//                     />
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => updateSkill(skill._id)}
//                         className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
//                       >
//                         ✅ Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
//                       >
//                         ❌ Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <div>
//                     <div className="flex justify-between items-start mb-3">
//                       <h4 className="font-bold text-lg text-gray-900">{skill.name}</h4>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => startEditingSkill(skill)}
//                           className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
//                           title="Edit skill"
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           onClick={() => deleteSkill(skill._id)}
//                           className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
//                           title="Delete skill"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-gray-600">Proficiency:</span>
//                         <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
//                           {skill.proficiency}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-gray-600">Hours:</span>
//                         <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
//                           {skill.hours}h
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {skills.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">📝</div>
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">No skills added yet</h3>
//               <p className="text-gray-500">Start by adding your first skill above!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

const Dashboard = () => {
  const { backendUrl, userData, getUserData } = useContext(AppContext);

  // Personal Info states
  const [bio, setBio] = useState('');
  const [goals, setGoals] = useState('');

  // Skills states
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: '', hoursSpent: '' });
  const [editingSkill, setEditingSkill] = useState(null);
  const [editSkillData, setEditSkillData] = useState({ name: '', proficiency: '', hoursSpent: '' });

  // Fetch personal info and skills
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setBio(data.userData.bio || '');
        setGoals(data.userData.goals || '');
        setSkills(data.userData.skills || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error fetching data.', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update personal info
  const updatePersonalInfo = async () => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/user/personal-info`, { bio, goals });
      if (data.success) {
        toast.success('Personal info updated!');
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error updating personal info.', error.message);
    }
  };

  // Add new skill
  const addSkill = async () => {
    if (!newSkill.name || !newSkill.proficiency || !newSkill.hoursSpent) {
      return toast.warn('Fill all skill fields.');
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/skill/add`, newSkill);
      if (data.success) {
        toast.success('Skill added!');
        setNewSkill({ name: '', proficiency: '', hoursSpent: '' });
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error adding skill.', error.message);
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/skill/delete/${id}`);
      if (data.success) {
        toast.success('Skill deleted!');
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error deleting skill.', error.message);
    }
  };

  // Update skill
  const updateSkill = async (id) => {
    if (!editSkillData.name || !editSkillData.proficiency || !editSkillData.hoursSpent) {
      return toast.warn('Fill all skill fields.');
    }

    try {
      const { data } = await axios.put(`${backendUrl}/api/skill/update/${id}`, editSkillData);
      if (data.success) {
        toast.success('Skill updated!');
        setEditingSkill(null);
        setEditSkillData({ name: '', proficiency: '', hoursSpent: '' });
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error updating skill.', error.message);
    }
  };

  // Start editing a skill
  const startEditingSkill = (skill) => {
    setEditingSkill(skill._id);
    setEditSkillData({
      name: skill.name,
      proficiency: skill.proficiency,
      hoursSpent: skill.hoursSpent,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingSkill(null);
    setEditSkillData({ name: '', proficiency: '', hoursSpent: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Header with User Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">
                    {userData?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome, {userData?.name || 'User'}
                </h1>
                <div className="flex items-center text-gray-600 mb-1">
                  <span className="w-4 h-4 mr-2">📧</span>
                  <span>{userData?.email || 'user@example.com'}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Dashboard • Last updated today
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center bg-blue-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{skills.length}</div>
                <div className="text-sm text-gray-500">Skills</div>
              </div>
              <div className="text-center bg-green-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {skills.reduce((total, skill) => total + parseInt(skill.hoursSpent || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-6 h-6 mr-3 text-blue-600">👤</span>
            Personal Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Bio</label>
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Goals</label>
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                rows="3"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What are your learning goals?"
              />
            </div>

            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={updatePersonalInfo}
            >
              Update Information
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-6 h-6 mr-3 text-green-600">🏆</span>
            Skills Management
          </h2>

          {/* Add New Skill Form */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8 border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-4">Add New Skill</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Skill Name"
                className="border-2 border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Proficiency Level"
                className="border-2 border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                value={newSkill.proficiency}
                onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
              />
              <input
                type="number"
                placeholder="Hours Spent"
                className="border-2 border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                value={newSkill.hoursSpent}
                onChange={(e) => setNewSkill({ ...newSkill, hoursSpent: Number(e.target.value) })}
              />
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={addSkill}
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Skills List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="group border-2 border-gray-200 p-6 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
              >
                {editingSkill === skill._id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editSkillData.name}
                      onChange={(e) => setEditSkillData({ ...editSkillData, name: e.target.value })}
                      className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Skill name"
                    />
                    <input
                      type="text"
                      value={editSkillData.proficiency}
                      onChange={(e) =>
                        setEditSkillData({ ...editSkillData, proficiency: e.target.value })
                      }
                      className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Proficiency level"
                    />
                    <input
                      type="number"
                      value={editSkillData.hoursSpent}
                      onChange={(e) =>
                        setEditSkillData({ ...editSkillData, hoursSpent: Number(e.target.value) })
                      }
                      className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Hours spent"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateSkill(skill._id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg text-gray-900">{skill.name}</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditingSkill(skill)}
                          className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                          title="Edit skill"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteSkill(skill._id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                          title="Delete skill"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Proficiency:</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {skill.proficiency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Hours:</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {skill.hoursSpent}h
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {skills.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No skills added yet</h3>
              <p className="text-gray-500">Start by adding your first skill above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
