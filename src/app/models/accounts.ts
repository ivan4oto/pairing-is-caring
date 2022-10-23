import { FileImage } from "./fileUpload";
import { PairingGroup, PairingSession } from "./pairing-sessions";

export interface AccountListResponse {
    id: number;
    pairing_session: PairingSession;
    pairing_group?: string;
    username: string;
    email: string;
    is_active: boolean;    
}

export interface Account {
    id: number;
    pairing_session: PairingSession;
    pairing_group?: PairingGroup;
    username: string;
    email: string;
    is_active: boolean;
    profile_image: FileImage; 
}

export interface AccountOutputSerializer {
    id: number;
    pairing_group?: PairingGroup;
    pairing_session: PairingSession;
    username: string;
    email: string;
    is_active: boolean;   
}