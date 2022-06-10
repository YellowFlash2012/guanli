import { useMutation, useQuery } from "@apollo/client";
import { message, Spin } from "antd";
import { useState } from "react";
import { FaList} from "react-icons/fa";

import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddProjectModal = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("new");
    const [clientId, setClientId] = useState("");

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    // get client query for client data in the form below
    const {loading,error,data}=useQuery(GET_CLIENTS)

    const addNewProjectHandler = (e) => {
        e.preventDefault();

        console.log(name, description, status, clientId);

        if (name === "" || description === "" || status === "") {
            return message.warning("All the fields are required!");
        }

        addProject(name, description, status, clientId);

        setName("");
        setDescription("");
        setStatus("new");
        setClientId("")
    };

    if (loading) {
        <Spin size="large" />;
    }

    if (error) {
        message.error("Something went wrong");
    }

    return (
        <>
            {!loading && !error && (
                
            <>        
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addProjectModal"
            >
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>Add Project</div>
                </div>
            </button>

            
            <div
                className="modal fade"
                id="addProjectModal"
                tabIndex="-1"
                aria-labelledby="addProjectModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="addProjectModalLabel"
                            >
                                New Project
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={addNewProjectHandler}>
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
                                    <label className="form-label">Description</label>

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
                                        <option value="progress">In progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Client</label>

                                    <select
                                        className="form-select"
                                        
                                        id="clientId"
                                        value={clientId}
                                        onChange={(e) =>
                                            setClientId(e.target.value)
                                        }
                                        
                                        required
                                    >
                                        <option value="">Select Client</option>
                                        {data.clients.map((client) => (
                                            <option key={client.id} value={client.id}>{ client.name}</option>
                                        ))}
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
                                        Add Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
            )}
            
        </>
    );
};
export default AddProjectModal;
