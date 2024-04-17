export interface AuthInputTyping {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
  password: string;
}

export interface ForgetInputTyping {
    email: string;
  }

  export interface ResetInputTyping {
    newPassword: string;
    newPasswordConfirmation: string
  }
