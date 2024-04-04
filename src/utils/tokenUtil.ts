export function decodeToken(token:string) {
    
    const parts = token.split('.');
    
    const encodedPayload = parts[1];
    
    const decodedPayload = atob(encodedPayload);
    
    const payload = JSON.parse(decodedPayload);
    
    return payload;
}