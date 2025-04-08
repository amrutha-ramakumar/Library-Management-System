
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getProfile, updateProfile } from "../services/profileService";

// const Profile = () => {
//   const token = useSelector((state) => state.auth.token);
//   const [profile, setProfile] = useState({ id: "", email: "", name: "", phone: "", role: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchProfile = () => {
//     if (token) {
//       setLoading(true);
//       getProfile(token)
//         .then((data) => {
//           setProfile(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           setError("Failed to load profile");
//           setLoading(false);
//           console.error(error);
//         });
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, [token]); // Runs when token changes

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       await updateProfile(token, profile);
//       fetchProfile(); // Refetch profile after update
//       setIsEditing(false);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to update profile");
//       setLoading(false);
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return <p>Loading profile...</p>;
//   }

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
//       <h2 style={{ textAlign: "center" }}>Profile</h2>

//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>ID:</strong></label>
//         <p>{profile.id}</p>
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Email:</strong></label>
//         <p>{profile.email}</p>
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Role:</strong></label>
//         <p>{profile.role}</p>
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Name:</strong></label>
//         {isEditing ? (
//           <input
//             type="text"
//             value={profile.name}
//             onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         ) : (
//           <p>{profile.name}</p>
//         )}
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Phone:</strong></label>
//         {isEditing ? (
//           <input
//             type="text"
//             value={profile.phone}
//             onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         ) : (
//           <p>{profile.phone}</p>
//         )}
//       </div>

//       {isEditing ? (
//         <>
//           <button onClick={handleUpdate} style={{ width: "48%", padding: "10px", background: "green", color: "white", border: "none", cursor: "pointer", marginRight: "4%" }}>
//             Save
//           </button>
//           <button onClick={() => setIsEditing(false)} style={{ width: "48%", padding: "10px", background: "red", color: "white", border: "none", cursor: "pointer" }}>
//             Cancel
//           </button>
//         </>
//       ) : (
//         <button onClick={() => setIsEditing(true)} style={{ width: "100%", padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
//           Edit
//         </button>
//       )}
//     </div>
//   );
// };

// export default Profile;
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
      setLoading(true);
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
      await updateProfile(token, profile);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      setError("Failed to update profile");
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Profile</h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-gray-600 font-medium">ID:</label>
          <p className="text-gray-800 font-semibold">{profile.id}</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Email:</label>
          <p className="text-gray-800 font-semibold">{profile.email}</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Role:</label>
          <p className="text-gray-800 font-semibold">{profile.role}</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          ) : (
            <p className="text-gray-800 font-semibold">{profile.name}</p>
          )}
        </div>
        <div>
          <label className="text-gray-600 font-medium">Phone:</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          ) : (
            <p className="text-gray-800 font-semibold">{profile.phone}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="w-1/2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;