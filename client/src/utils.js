const API =
    process.env.NODE_ENV === "production"
        ? "https://guanli-app.herokuapp.com/graphql"
        : "http://localhost:5000/graphql";

export default API
