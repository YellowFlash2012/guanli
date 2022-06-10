import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const DeleteProjectButton = ({ id }) => {

    const navigate = useNavigate();
    
    const [deleteProjectHandler] = useMutation(DELETE_PROJECT, {
        variables: { id: id },
        onCompleted: () => navigate("/"),
        refetchQueries: [{ query: GET_PROJECTS }]
    });

    return <div className="d-flex mt-5 ms-auto">
        <button className="btn btn-danger m-2" onClick={deleteProjectHandler}>
            <FaTrash className="icon" /> Delete Project
</button>
    </div>;
};
export default DeleteProjectButton;
