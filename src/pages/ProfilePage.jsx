import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="profile-page container text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-page container">
      <div className="profile-header text-center">
        <h1>My Profile</h1>
        <p>Manage your account information and preferences.</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="profile-details">
            <div className="detail-row">
              <User size={20} className="detail-icon" />
              <div className="detail-info">
                <label>Full Name</label>
                <span>{user.name}</span>
              </div>
            </div>

            <div className="detail-row">
              <Mail size={20} className="detail-icon" />
              <div className="detail-info">
                <label>Email Address</label>
                <span>{user.email}</span>
              </div>
            </div>

            <div className="detail-row">
              <Shield size={20} className="detail-icon" />
              <div className="detail-info">
                <label>Account Role</label>
                <span className="role-badge">{user.role}</span>
              </div>
            </div>

            <div className="detail-row">
              <Calendar size={20} className="detail-icon" />
              <div className="detail-info">
                <label>Member Since</label>
                <span>{new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
