import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

const Dashboard = () => {
  const { backendUrl, userData, getUserData } = useContext(AppContext);

  // States
  const [bio, setBio] = useState('');
  const [goals, setGoals] = useState('');
  const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: '', hoursSpent: '' });
  const [editingSkill, setEditingSkill] = useState(null);
  const [editSkillData, setEditSkillData] = useState({ name: '', proficiency: '', hoursSpent: '' });

  // API calls
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

  const updatePersonalInfo = async () => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/user/personal-info`, { bio, goals });
      if (data.success) {
        toast.success('Personal info updated!');
        getUserData();
        setShowPersonalInfoForm(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error updating personal info.', error.message);
    }
  };

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

  const startEditingSkill = (skill) => {
    setEditingSkill(skill._id);
    setEditSkillData({ name: skill.name, proficiency: skill.proficiency, hoursSpent: skill.hoursSpent });
  };

  const cancelEditing = () => {
    setEditingSkill(null);
    setEditSkillData({ name: '', proficiency: '', hoursSpent: '' });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate dashboard metrics
  const totalHours = skills.reduce((total, skill) => total + parseInt(skill.hoursSpent || 0), 0);
  const avgHours = skills.length > 0 ? Math.round(totalHours / skills.length) : 0;
  const topSkill = skills.reduce((max, skill) => parseInt(skill.hoursSpent || 0) > parseInt(max.hoursSpent || 0) ? skill : max, skills[0] || {});

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <div className="bg-white/30 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {userData?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-gray-200">Dashboard</h1>
                <p className="text-sm text-gray-300">Welcome back, <span className='text-lg font-bold text-green-400'>{userData?.name || 'User'}</span></p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-bl from-cyan-200 to-emerald-500 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📚</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Skills</dt>
                    <dd className="text-lg font-medium text-gray-900">{skills.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-bl from-red-100 to-yellow-500 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">⏱️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Hours</dt>
                    <dd className="text-lg font-medium text-gray-900">{totalHours}h</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-bl from-indigo-200 to-violet-500 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Hours/Skill</dt>
                    <dd className="text-lg font-medium text-gray-900">{avgHours}h</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-bl from-purple-300 to-pink-500 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">🏆</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Top Skill</dt>
                    <dd className="text-lg font-medium text-gray-900 truncate">{topSkill.name || 'None'}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 shadow rounded-lg mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                  <button
                    onClick={() => setShowPersonalInfoForm(!showPersonalInfoForm)}
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                  >
                    {showPersonalInfoForm ? 'Cancel' : 'Edit'}
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl font-bold">
                      {userData?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{userData?.name || 'User'}</h4>
                    <p className="text-sm text-gray-700">{userData?.email || 'user@example.com'}</p>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mb-4 border-2 rounded-md p-2 border-zinc-300">
                  <h5 className="text-md font-medium text-gray-900 mb-2">Bio</h5>
                  <p className="text-sm text-gray-700">
                    {bio || 'No bio added yet.'}
                  </p>
                </div>

                {/* Goals Section */}
                <div className="mb-4 border-2 rounded-md p-2 border-zinc-300">
                  <h5 className="text-md font-medium text-gray-900 mb-2">Goals</h5>
                  <p className="text-sm text-gray-700">
                    {goals || 'No goals set yet.'}
                  </p>
                </div>

                {/* Edit Form */}
                {showPersonalInfoForm && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          rows={3}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                        <textarea
                          rows={2}
                          value={goals}
                          onChange={(e) => setGoals(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="What are your learning goals?"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={updatePersonalInfo}
                          className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setShowPersonalInfoForm(false)}
                          className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Skills Management */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Skills Management</h3>
              </div>
              
              {/* Add New Skill */}
              <div className="px-6 py-4 bg-white/60 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Skill</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Proficiency Level"
                    value={newSkill.proficiency}
                    onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Hours Spent"
                    value={newSkill.hoursSpent}
                    onChange={(e) => setNewSkill({ ...newSkill, hoursSpent: Number(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={addSkill}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Skills List */}
              <div className="px-6 py-4">
                {skills.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
                    <p className="text-gray-500">Start by adding your first skill above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        {editingSkill === skill._id ? (
                          // Edit Mode
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <input
                              type="text"
                              value={editSkillData.name}
                              onChange={(e) => setEditSkillData({ ...editSkillData, name: e.target.value })}
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <input
                              type="text"
                              value={editSkillData.proficiency}
                              onChange={(e) => setEditSkillData({ ...editSkillData, proficiency: e.target.value })}
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <input
                              type="number"
                              value={editSkillData.hoursSpent}
                              onChange={(e) => setEditSkillData({ ...editSkillData, hoursSpent: Number(e.target.value) })}
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => updateSkill(skill._id)}
                                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex items-center justify-between">
                            <div className="flex-grow">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <span className="text-indigo-600 font-medium text-sm">
                                      {skill.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex-grow">
                                  <h4 className="text-sm font-medium text-gray-900">{skill.name}</h4>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {skill.proficiency}
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      {skill.hoursSpent}h
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => startEditingSkill(skill)}
                                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteSkill(skill._id)}
                                className="text-red-600 hover:text-red-500 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;