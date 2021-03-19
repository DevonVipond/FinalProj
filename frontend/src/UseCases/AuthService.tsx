class AuthService {

    setAuth(accountType: string): void {
        sessionStorage.setItem('auth', accountType)
    }

    removeAuth(): void {
        sessionStorage.removeItem('auth')
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