import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";
import { useState } from "react";
import {FaUser} from "react-icons/fa"
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClientModal = () => {

    const  [name, setName ] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });

            cache.writeQuery({
                query: GET_CLIENTS,
                data:{clients:[...clients, addClient]}
            })
        }
    })

    const addNewClientHandler = (e) => {
        e.preventDefault();

        console.log(name, email, phone);
        
        if (name===""||email===""||phone==="") {
            return message.warning("All the fields are required!");
        };

        addClient(name, email, phone);

        setName("");
        setEmail("");
        setPhone("");
    }

    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addClientModal"
            >
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Add Client</div>
                </div>
            </button>

            {/* modal */}
            <div
                className="modal fade"
                id="addClientModal"
                tabIndex="-1"
                aria-labelledby="addClientModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="addClientModalLabel"
                            >
                                Add New Client
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={addNewClientHandler}>
                                <div className="mb-3">
                                    <label required className="form-label">Name</label>

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
                                    <label className="form-label">Email</label>

                                    <input
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter client's email"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        placeholder="Enter client's phone"
                                        required
                                    />
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
                                data-bs-dismiss={!name || !email || !phone ? "" : "modal"}
                            >
                                Add Client
                            </button>
                        </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddClientModal;
