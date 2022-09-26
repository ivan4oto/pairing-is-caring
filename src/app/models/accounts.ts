import { PairingSession } from "./pairing-sessions";

export interface AccountListResponse {
    pairing_session: PairingSession;
    username: string;
    email: string;
    is_active: boolean;    
}