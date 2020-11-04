import { CHANGE_ENV, CHANGE_MOVING, SET_BACKWORLD, SET_PLAYER_CENTER, SET_PLAYER_INVERT } from "../actions/actiontypes";


export interface IParallax{
    image: string,
    index: number
}

export interface IMisc{
    title: string,
    descrip: string,
    remarks: string,
    btnString: string
}

export interface IStats{
    name: string,
    age: number,
    occupation: string,
    status: string,
    skills: string[],
    toolsUsed: string[]
}

export interface IEducation{
    schoolList: ISchool[]
}

interface IAcademic{
    gpa: string,
    sectionList: ISubSection[]
}

export interface ISchool{
    schoolName: string,
    studyPeriod: string,
    studyScope: string,
    academicComponent: IAcademic,
    ccaList: string[],
    awardsList: string[]
}

export interface ISubSection{
    sectionTitle: string,
    bulletPoints: string[]  
}

export interface IExperience{
    positionList: IPosition[]
}

export interface IPosition{
    role: string,
    division: string,
    organisation: string,
    positionPeriod: string,
    descriptionList: string[]
}


export interface ICarousel{
    title: string,
    route: string
}

export interface IAchievement{
    achievementRoute: string,
    issueDate: string,
    title: string,
    issuedBy: string,
    descripList: string[]
}

export interface IProject{
    projectRoute: string,
    imageUrlList: string[],
    projectTitle: string,
    projectPeriod: string,
    tags: string[],
    builtWith: string[],
    projectLink: string,
    descripList: string[]
}

export interface IContact{
    email: string,
    discord: string,
    linkedinLink: string,
    githubLink: string
}


// app and reducer states
export interface AppState{
    env: IEnvState,
    data: IDataState  
}

export interface IDataState{
    stats: IStats,
    education:IEducation,
    experience: IExperience,
    projects: IProject[],
    achievements: {
        awards: IAchievement[],
        certs: IAchievement[]
    },
    contact: IContact
}


export interface IEnvState{
    moving: boolean
    playerCenter: boolean
    envBg: string
    bgCount: number
    bgList: string[]
    backToWorld: boolean
    playerInvert: boolean
}

// env actions
export interface IChangeMovingAction{
    type: typeof CHANGE_MOVING,
    payload: boolean
}

export interface ISetPlayerCenter{
    type: typeof SET_PLAYER_CENTER,
    payload: boolean
}

export interface IChangeEnvAction{
    type: typeof CHANGE_ENV,
    payload: string
}

export interface ISetBackWorld{
    type: typeof SET_BACKWORLD,
    payload: boolean
}

export interface ISetPlayerInvert{
    type: typeof SET_PLAYER_INVERT,
    payload: boolean
}

export type TEnvActionTypes = IChangeMovingAction | IChangeEnvAction | ISetPlayerCenter | ISetBackWorld | ISetPlayerInvert;
