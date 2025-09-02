
export interface IInputs {
  name: string
  email: string
  password: string
}

export interface ISignUpFx {
  password: string
  email: string
  isOAuth?: boolean
  name?: string
}

export interface IAuthSideProps {
  toggleAuth: VoidFunction
  isSideActive: boolean
}
