export interface IEmployeeRepository {
  login(email: string, password: string): Promise<string>
  forgotPassword(email: string): Promise<string>
  confirmForgotPassword(email: string, newPassword: string, createdAt: number): Promise<string>
}