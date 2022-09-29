import { PairingSession } from "./pairing-sessions";

export interface AccountListResponse {
    id: number;
    pairing_session: PairingSession;
    username: string;
    email: string;
    is_active: boolean;    
}

export interface Account {
    id: number;
    pairing_session: PairingSession;
    username: string;
    email: string;
    is_active: boolean;   
}

export interface AccountOutputModel {
    id: number;
    pairing_session?: PairingSession;
    username: string;
    email: string;
    is_active: boolean;   
}