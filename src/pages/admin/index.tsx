import { useEffect, useState } from "react";
import { getActiveProjects, assignUserToProject, removeUserFromProject } from "../../services/projects";
import AssignUserModal from "../../components/admin/assignProject";

export const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (projects.length > 0) {
      return;
    }
    fetchProjects().then(() => {
      console.log('Loaded projects');
    });
  }, [projects]);
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getActiveProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!projects || users) return;
    setUsers(projects.map((ele) => ele.users));
  }, [projects]);

  const openAssignModal = (projectId) => {
    setSelectedProjectId(projectId);
    setModalShow(true);
  };

  const handleAssignUser = async (projectId, userId) => {
    await assignUserToProject(projectId, userId);
    alert("User assigned successfully!");
    fetchProjects().then()
    setModalShow(false);
  };

  const handleRemoveUser = async (projectId, userId) => {
    await removeUserFromProject(projectId, userId);
    projects.filter((ele) => {
      if (ele.id === projectId) {
        ele.users = ele.users.filter((user) => user.id !== userId);
      }
    });
    alert("User un assigned successfully!");
    setModalShow(false);
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading active projects...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold">Admin Dashboard</h2>

      {projects.length === 0 ? (
        <div className="alert alert-warning text-center">No active projects found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td className="fw-semibold">{project.name}</td>
                <td>{project.description}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2 text-white font-monospace"
                    onClick={() => openAssignModal(project.id)}
                  >
                    <i className="bi bi-person-plus"></i> Assign/UnAssign User
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
      {modalShow && selectedProjectId && projects.length > 0 && (
        <AssignUserModal
          projectInfo={projects.filter((ele) => ele.id === selectedProjectId)[0]}
          show={modalShow}
          onClose={() => setModalShow(false)}
          onAssign={handleAssignUser}
          onRemove={handleRemoveUser}
        />
      )}
    </div>
  );
};
