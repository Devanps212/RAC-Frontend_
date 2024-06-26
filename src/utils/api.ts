const configKeys  = {
    API_URL:import.meta.env.VITE_ENVIRONMENT === "dev" ? import.meta.env.VITE_BACKEND_SERVER_LOCAL : import.meta.env.VITE_BACKEND_SERVER,
    SOCKET_PORT: import.meta.env.VITE_SCOKET
}
export default configKeys