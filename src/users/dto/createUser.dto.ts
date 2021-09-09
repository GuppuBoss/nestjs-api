export default interface User {
    id: number;
    name: string;
    username: string;
    password?: string;
    email: string;
}
export interface UserRecieved {
    name: string;
    username: string;
    password: string;
    email: string;
}