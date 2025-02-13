import {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {useParams} from "react-router-dom";
import taskSchema from "../../schemas/task.schema";
import {DURATION_UNIT, DURATIONS} from "../../constants";
import axios, {AxiosError} from "axios";

const UserDashboard = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const initialValues = {
    name: '',
    description: '',
    user_id: id,
    project_id: selectedProjectId,
    duration: {
      unit: 'days',
      period: 1
    },
    start_time: '',
  }
  const openModal = (projectId) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (projects.length > 0) {
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/users/${id}`);
        const data = await response.json();
        setProjects(data.projects);
        setAssignedProjects(data.assigned_projects)
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects().then(() => console.log("Fetched projects"));
  }, [projects]);

  const handleAddTask = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/tasks", values);
      const newTask = response.data;
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === values.project_id
            ? { ...project, tasks: [...project.tasks, newTask] }
            : project
        )
      );
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error creating task:", error);
      if (error instanceof AxiosError) {
        alert(JSON.stringify(error.response?.data));
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>

      {projects?.map((project) => (
        <div key={project.id} className="card my-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5>{project.name}</h5>
            { assignedProjects.some((ele) => { return ele.project_id === project.id}) && (
              <button className="btn btn-primary btn-sm" onClick={() => openModal(project.id)}>
                Add Task
              </button>
            )}
          </div>
          <ul className="list-group">
            {project?.tasks?.map((task) => (
              <li key={task.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-1">{task.name}</h5>
                  <span className="badge bg-primary">{task.duration}</span>
                </div>
                <p className="mb-1 text-muted">{task.description || "No description available"}</p>
                <small className="text-secondary">Start Time: {task.start_time}</small>
              </li>
            ))}
          </ul>
          <ul className={'list-none'}>
            <li>
              Total Time:{" "}
              {(
                project?.tasks
                  ?.map((task) => {
                    const taskStartTime = new Date(task.start_time).getTime();
                    const taskEndTime = task.end_time ? new Date(task.end_time).getTime() : Date.now();
                    return (taskEndTime - taskStartTime) / (1000 * 60 * 60);
                  })
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)
                )}
              hours
            </li>
          </ul>

        </div>
      ))}

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Task</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <Formik initialValues={initialValues} validationSchema={taskSchema} onSubmit={handleAddTask}>
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Task Name</label>
                        <Field type="text" name="name" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="text-danger"/>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <Field as="textarea" name="description" className="form-control"/>
                        <ErrorMessage name="description" component="div" className="text-danger"/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Start Time</label>
                        <Field type="datetime-local" name="start_time" className="form-control"/>
                        <ErrorMessage name="start_time" component="div" className="text-danger"/>
                      </div>
                      <div className="mb-3 d-none">
                        <label className="form-label">User ID</label>
                        <Field type="number" name="user_id" className="form-control"/>
                        <ErrorMessage name="userId" component="div" className="text-danger"/>
                      </div>

                      <div className="mb-3 d-none">
                        <label className="form-label">Project ID</label>
                        <Field type="number" name="project_id" className="form-control"/>
                        <ErrorMessage name="projectId" component="div" className="text-danger"/>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Duration Unit</label>
                        <Field as="select" name="duration.unit" className="form-select">
                          {DURATION_UNIT.map((ele) => {
                            return <option key={ele} value={ele}>{ele}</option>;
                          })}
                        </Field>
                        <ErrorMessage name="duration.unit" component="div" className="text-danger"/>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Duration Period</label>
                        <Field as="select" name="duration.unit" className="form-select">
                          {DURATIONS.map((ele) => {
                            return <option key={ele} value={ele}>{ele}</option>;
                          })}
                        </Field>
                        <ErrorMessage name="duration.period" component="div" className="text-danger"/>
                      </div>

                      <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                        Add Task
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show" onClick={closeModal}></div>}
    </div>
  );
};

export default UserDashboard;
