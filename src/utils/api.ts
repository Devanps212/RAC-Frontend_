const configKeys  = {
    API_URL:import.meta.env.VITE_ENVIRONMENT === "production" ? import.meta.env.VITE_BACKEND_SERVER : import.meta.env.VITE_BACKEND_SERVER_LOCAL,
    SOCKET_PORT: import.meta.env.VITE_SCOKET
}
export default configKeys