import { AppUser } from './AppUser';
import { Issue } from './Issue';
export interface AppUserIssue {
    appUserId: number;
    issueId: number;
    appUser: AppUser;
    issue: Issue;
}