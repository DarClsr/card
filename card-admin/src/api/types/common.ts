
export interface ILoginParams{
    account:string
    password:string
}

export interface ILoginInfo{
    user?:IUserInfo,
    token?:string
}

export interface IUserInfo{
    account:string,
    _id:string,
    nick_name:string,
    avatar:string,
    token:string,
}