using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;

namespace API.Repositories
{
    public class IssueRepository
    {
        private readonly ApplicationDbContext _context;

        public IssueRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Issue> CreateAsync(Issue issue)
        {
            issue.ListPosition = await CalculateListPosition(issue);
            issue.CreatedUtc = DateTime.UtcNow;
            issue.UpdatedUtc = DateTime.UtcNow;
            _context.Issues.Add(issue);
            await _context.SaveChangesAsync();
            return issue;
        }

        public async Task<Issue> UpdateAsync(Issue issue)
        {
            var objFromDb = _context.Issues.FirstOrDefault(x => x.Id == issue.Id);
            if (objFromDb != null)
            {
                objFromDb.UpdatedUtc = DateTime.UtcNow;
                objFromDb.Title = issue.Title;
                objFromDb.Description = issue.Description;
                objFromDb.Type = issue.Type;
                objFromDb.Status = issue.Status;
                objFromDb.Priority = issue.Priority;
                objFromDb.ListPosition = issue.ListPosition;
                objFromDb.DescriptionText = issue.DescriptionText;
                objFromDb.Estimate = issue.Estimate;
                objFromDb.TimeRemaining = issue.TimeRemaining;
                objFromDb.TimeSpent = issue.TimeSpent;

                _context.Issues.Update(objFromDb);
                await _context.SaveChangesAsync();
                return objFromDb;
            }
            else
                throw new Exception("Issue not found in database");
        }

        public async Task<bool> DeleteAsync(int issueId)
        {
            var objFromDb = _context.Issues.FirstOrDefault(x => x.Id == issueId);
            if (objFromDb != null)
            {
                _context.Issues.Remove(objFromDb);
                await _context.SaveChangesAsync();
                return true;
            }
            else
                return false;
        }

        public async Task<List<Issue>> GetIssuesByProjectIdAsync(int projectId)
        {
            return await _context.Issues.Where(x => x.ProjectId == projectId).ToListAsync();
        }

        public async Task<List<Issue>> SearchIssuesAsync(SearchIssueDto searchIssue)
        {
            var issueResults = await _context.Issues
                .Where(x => x.ProjectId == searchIssue.ProjectId 
                && 
                    (
                        x.Title.Contains(searchIssue.SearchTerm) ||
                        x.DescriptionText.Contains(searchIssue.SearchTerm) ||
                        x.Description.Contains(searchIssue.SearchTerm)
                    )
                ).ToListAsync();
            return issueResults;
        }

        public async Task<Issue> GetIssueWithUsersAndCommentsAsync(int issueId)
        {
            return await _context.Issues
                .Where(x => x.Id == issueId)
                .Include("Comments")
                .Include("Comments.AppUser")
                .Include("AppUserIssues")
                .Include("AppUserIssues.AppUser")
                .Include("Reporter")
                .FirstOrDefaultAsync();
        }     

        public async Task<int> CalculateListPosition(Issue issue)
        {
            List<Issue> issues = await _context.Issues.Where(x => x.ProjectId == issue.ProjectId && x.Status == issue.Status).ToListAsync();

            if (issues != null && issues.Count > 0)
            {
                var lowest = issues.OrderBy(x => x.ListPosition).FirstOrDefault();
                return lowest.ListPosition - 1;
            }
            else
                return 1;
        }

        //private async Task<List<Issue>> CalculateListPositions(Issue issueWithNewPosition)
        //{
        //    List<Issue> issuesToChange = await _context.Issues.Where(x => x.ProjectId == issueWithNewPosition.ProjectId && x.Status == issueWithNewPosition.Status).ToListAsync();

        //    if(issuesToChange.Any() == false)
        //    {
        //        issueWithNewPosition.ListPosition = 0;
        //        return new List<Issue> { issueWithNewPosition };
        //    }

        //    issuesToChange = issuesToChange.OrderBy(x => x.ListPosition).ToList();

        //    var issueInCollection = issuesToChange.FirstOrDefault(x => x.Id == issueWithNewPosition.Id);
        //    ObservableCollection<Issue> observable = new ObservableCollection<Issue>(issuesToChange);
        //    if(issueInCollection != null) //update existing issue
        //    {
        //        observable.Move(issueInCollection.ListPosition, issueWithNewPosition.ListPosition);
        //    }
        //    else // new issue
        //    {
        //        observable.Insert(issueWithNewPosition.ListPosition, issueWithNewPosition);
        //    }

        //    for (int i = 0; i < observable.Count; i++)
        //    {
        //        observable[i].ListPosition = i;
        //    }

        //    return observable.ToList();
        //}
    }
}
