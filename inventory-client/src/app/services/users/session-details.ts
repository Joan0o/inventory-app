export interface SessionDetails {
  token: string,
  user: {
    id: number,
    username: string,
    role: string
  }
}
