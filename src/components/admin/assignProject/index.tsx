import { useEffect, useState } from "react";

const AssignUserModal = ({projectInfo, show, onClose, onAssign, onRemove }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!show) return;

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/users"); // Replace with actual API
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users.");
      }
      setLoading(false);
    };
    fetchUsers();
  }, [show]);

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Assign User to Project</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary"></div>
                <p>Loading users...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <table className="table table-hover">
                <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      { user.assigned_projects.some((ele) => ele.project_id === projectInfo.id) ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onRemove(projectInfo.id, user.id)}
                        >
                          <i className="bi bi-x-circle"></i> Unassign
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => onAssign(projectInfo.id, user.id)}
                        >
                          <i className="bi bi-check-circle"></i> Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignUserModal;
