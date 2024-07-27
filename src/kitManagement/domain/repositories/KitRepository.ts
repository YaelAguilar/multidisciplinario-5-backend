import { Kit } from "../entities/Kit";

export interface KitRepository {
    findBySerialNumber(serialNumber: string): Promise<Kit | undefined>;
    save(kit: Kit): Promise<void>;
}
