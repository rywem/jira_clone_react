import { AppUser } from "./AppUser";
import { Issue } from "./Issue";

export interface Comment {
    id: number;
    body: string;
    createdUtc: Date;
    updatedUtc: Date;
    appUserId: number;
    appUser: AppUser;
    issueId: number;
    issue: Issue;
}
