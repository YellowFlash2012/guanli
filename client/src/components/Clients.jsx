import { useQuery } from "@apollo/client"
import { Spin, message } from "antd";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";



const Clients = () => {
    const { loading, data, error } = useQuery(GET_CLIENTS);

    if (loading) {
        <Spin size="large" />;
    }

    if (error) {
        message.error("Something went wrong");
    }

    return <div>
        {!loading && !error && (
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    
                    {data.clients.map((client)=>(<ClientRow key={client.id} client={client}/>))}
                    
                </tbody>
            </table>
        ) }
    </div>;
};
export default Clients;
