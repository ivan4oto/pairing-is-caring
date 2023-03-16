export interface PairingSession {
    id: string;
    start_time: string;
    description: string;
    title: string;
}

export interface PairingGroup {
    id: number;
    name: string;
    createdBy: string;
    ownedBy: string;
}