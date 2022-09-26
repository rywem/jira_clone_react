using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUserIssue
    {
        public string AppUserId { get; set; }
        public int IssueId { get; set; }
        [ForeignKey("AppUserId")]
        public AppUser AppUser { get; set; }
        [ForeignKey("IssueId")]
        public Issue Issue { get; set; }
    }
}
