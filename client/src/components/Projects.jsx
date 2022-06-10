import { useQuery } from "@apollo/client";
import { message, Spin } from "antd";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";


const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {
        <Spin size="large" />;
    }

    if (error) {
        message.error("Something went wrong");
    }

    return <>
        {data && data.projects.length > 0 ? (
            <div className="row mt-4">
                {data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        ):(<h2>No project to display!</h2>)}
    </>;
};
export default Projects;
