import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile, updateProfile } from "../services/profileService";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState({ id: "", email: "", name: "", phone: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to load profile");
          setLoading(false);
          console.error(error);
        });
    }
  }, [token]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const updatedData = await updateProfile(token, profile);
      setProfile(updatedData);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      setError("Failed to update profile");
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Profile</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div style={{ marginBottom: "10px" }}>
        <label><strong>ID:</strong></label>
        <p>{profile.id}</p>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Email:</strong></label>
        <p>{profile.email}</p>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Role:</strong></label>
        <p>{profile.role}</p>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Name:</strong></label>
        {isEditing ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        ) : (
          <p>{profile.name}</p>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Phone:</strong></label>
        {isEditing ? (
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        ) : (
          <p>{profile.phone}</p>
        )}
      </div>

      {isEditing ? (
        <>
          <button onClick={handleUpdate} style={{ width: "48%", padding: "10px", background: "green", color: "white", border: "none", cursor: "pointer", marginRight: "4%" }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} style={{ width: "48%", padding: "10px", background: "red", color: "white", border: "none", cursor: "pointer" }}>
            Cancel
          </button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)} style={{ width: "100%", padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Profile;
