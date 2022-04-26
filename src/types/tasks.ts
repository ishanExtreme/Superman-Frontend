export type Task = {
    id: number,
    title: string,
    description: string,
    priority: number,
    completed: boolean,
    stage_name: string,
    due_date: string,
    created_date: string,
}

export type tab = {
    id: string,
    title: string
}

export type Board = {
    id:number,
    title:string,
    description:string
}
