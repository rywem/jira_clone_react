using API.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Issue
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public IssueType Type { get; set; }
        public IssueStatus Status { get; set; }
        public IssuePriority Priority { get; set; }
        public int ListPosition { get; set; }
        public string Description { get; set; }
        public string DescriptionText { get; set; }
        public int Estimate { get; set; }
        public int TimeRemaining { get; set; }
        public int TimeSpent { get; set; }
        public DateTime CreatedUtc { get; set; }
        public DateTime UpdatedUtc { get; set; }
        public string ReporterId { get; set; }
        [ForeignKey("ReporterId")]
        public AppUser Reporter { get; set; }
        public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        [InverseProperty("Issue")]
        public ICollection<Comment> Comments { get; set; }
        [InverseProperty("Issue")]
        public ICollection<AppUserIssue> AppUserIssues { get; set; }

        
    }
}
