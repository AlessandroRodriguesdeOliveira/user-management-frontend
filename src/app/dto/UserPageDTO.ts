export interface UserPage<T>{
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    first: boolean;
    last: boolean;
}