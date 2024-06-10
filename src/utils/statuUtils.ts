export const getStatus = (status:string)=>{
    switch (status.toLowerCase()){
        case 'available':
            return "text-success";
        case 'maintenance':
            return 'text-danger';
        case 'unavailable':
            return 'text-info';
        case 'booked':
            return 'text-primary'
        default:
            return 'text-dark'
    }
}