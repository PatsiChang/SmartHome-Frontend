export type UserLogin = {
    userId: string,
    password: string,
}
export type Person = {
    uid: string | null,
    userId: string,
    name: string,
    email: string,
    logInName: string,
    password: string,
}
export function isPerson(obj: any): obj is Person {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.uid === 'string' &&
        typeof obj.userId === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.password === 'string'
    );
}