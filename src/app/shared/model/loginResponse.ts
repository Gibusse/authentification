
export interface LoginResponse {
  insertWithAuth: InsertWithAuth,
  signUpWithAuth: SignUpWithAuth
}

export interface InsertWithAuth {
  status?: number
}

export interface SignUpWithAuth {
  data?: object
}
