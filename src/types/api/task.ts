export type TaskCreateApi = {
    title: string,
    description: string,
    priority: number,
    stage: number,
    due_date: string
}

export type BoardApi = {
    id: number,
    title: string,
    description?: string
}

export type StageApi = {
    id: number,
    title: string,
    description?: string,
    board_name: string
}

export type Error<T> = Partial<Record<keyof T, string>>

export const validateTaskCreation = (task:TaskCreateApi) => {
    const errors: Error<TaskCreateApi> = {}

    if(task.title.length < 1) {
        errors.title = "Title is Required"
    }
    if(task.title.length > 100) {
        errors.title = "Title is must be less than 100 characters"
    }
    if(task.description.length < 1) {
        errors.description = "Description is Required"
    }
    if(task.description.length > 500) {
        errors.description = "Description is must be less than 500 characters"
    }
    if(isNaN(task.priority)) {
        errors.priority = "Priority not provided correctly"
    }
    if(!task.priority) {
        errors.priority = "Priority is Required"
    }
    if(task.priority <= 0) {
        errors.priority = "Priority must be grater than 0"
    }
    if(task.priority > 100) {
        errors.priority = "Priority must be less than 100"
    }
    if(isNaN(task.stage)) {
        errors.stage = "Stage not provided correctly"
    }
    if(!task.stage) {
        errors.stage = "Stage not provided"
    }
    if(task.due_date.length < 1) {
        errors.due_date = "Due date is required"
    }

    return errors;
}