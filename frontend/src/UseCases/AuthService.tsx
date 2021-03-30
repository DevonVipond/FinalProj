class AuthService {

    setAuth(accountType: string): void {
        sessionStorage.setItem('auth', accountType)
    }

    setUsername(username: string): void {
        sessionStorage.setItem('username', username)
    }

    getUsername(): string | null {
        return sessionStorage.getItem('username')
    }

    removeAuth(): void {
        sessionStorage.removeItem('auth')
    }

    getAuth(): string | null{
        return sessionStorage.getItem('auth')
    }

    isAuthenticated(): boolean {
        if (sessionStorage.getItem('auth')) {
            return true
        }

        return false
    }
}

const authService = new AuthService()

export default authService