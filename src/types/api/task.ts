export type TaskCreateApi = {
    title: string,
    description: string,
    priority: number,
    stage: number,
    due_date: string
}

export type BoardCreateApi = {
    title:string,
    description:string
}

export type StageCreateApi = {
    title:string,
    description:string,
    board:number
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

export type VerificationApi = {
    code: string,
    phone: string
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

export const validateBoardCreation = (board:BoardCreateApi) => {
    const errors: Error<BoardCreateApi> = {}

    if(board.title.length < 1) {
        errors.title = "Title is Required"
    }
    if(board.title.length > 255) {
        errors.title = "Title is must be less than 255 characters"
    }
    if(board.description.length < 1) {
        errors.description = "Description is Required"
    }
    if(board.description.length > 500) {
        errors.description = "Description is must be less than 500 characters"
    }

    return errors;
}

export const validateStageCreation = (stage:StageCreateApi) => {
    const errors: Error<StageCreateApi> = {}

    if(stage.title.length < 1) {
        errors.title = "Title is Required"
    }
    if(stage.title.length > 255) {
        errors.title = "Title is must be less than 255 characters"
    }
    if(stage.description.length < 1) {
        errors.description = "Description is Required"
    }
    if(stage.description.length > 500) {
        errors.description = "Description is must be less than 500 characters"
    }
    if(isNaN(stage.board)) {
        errors.board = "Board not provided correctly"
    }
    if(!stage.board) {
        errors.board = "Board not provided"
    }

    return errors;
}

export const validateVerification = (verification:VerificationApi) => {
    const errors: Error<VerificationApi> = {}

    if(verification.code.length < 1) {
        errors.code = "Code is Required"
    }
    if(verification.code.length !== 6) {
        errors.code = "Verification code must be 6 characters"
    }

    if(verification.phone.length < 1) {
        errors.phone = "Phone is Required"
    }

    if(verification.phone.length !== 10) {
        errors.phone = "Phone number must be 10 characters"
    }

    return errors;
}
