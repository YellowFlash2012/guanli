import { useMutation } from "@apollo/client";
import { message } from "antd";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { EDIT_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";

const EditProjectForm = ({ project }) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState("");

    const [updateProject] = useMutation(EDIT_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    })

    const editProjectHandler = (e) => {
        e.preventDefault()

        if (!name||!description||!status) {
            return message.error("Those fields can NOT be empty!")
        }

        updateProject(name, description, status);
    }

    return (
        <div className="mt-2 text-end">
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editProjectModal"
            >
                <div className="d-flex align-items-center">
                    <FaEdit className="icon" />
                    <div>Edit Project</div>
                </div>
            </button>

            <div
                className="modal fade"
                id="editProjectModal"
                tabIndex="-1"
                aria-labelledby="editProjectModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="editProjectModalLabel"
                            >
                                Edit Project
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={editProjectHandler}>
                                <div className="mb-3">
                                    <label required className="form-label">
                                        Name
                                    </label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Enter client's name"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="Enter client's email"
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Status</label>

                                    <select
                                        className="form-select"
                                        id="status"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="new">Not Started</option>
                                        <option value="progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        data-bs-dismiss={
                                            !name || !description || !status
                                                ? ""
                                                : "modal"
                                        }
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditProjectForm;
