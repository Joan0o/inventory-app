export interface UserDetails {
  id: number,
  name: string,
  encrypted_password: string,
  salt: string,
  status: string,
  role: string,
  access_token: string,
  deleted: number
}
