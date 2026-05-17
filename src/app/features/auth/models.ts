export interface AuthResponse {
    token:     string;
    username:  string;
    email:     string;
    userId:    string;
    expiresAt: Date;
}

export interface RegisterRequest {
    name: string;
    username: string;
    email:    string;
    password: string;
}

export interface LoginRequest {
    username:    string;
    password: string;
}
