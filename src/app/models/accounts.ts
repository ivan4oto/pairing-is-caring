import { FileImage } from "./fileUpload";
import { PairingGroup, PairingSession } from "./pairing-sessions";

export interface Account {
    id: number;
    pairing_session: PairingSession;
    pairing_group?: PairingGroup;
    username: string;
    email: string;
    is_active: boolean;
    profile_image: FileImage; 
}
