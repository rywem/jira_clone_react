using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser : IdentityUser
    {
        
        public string AvatarUrl { get; set; }        
        [InverseProperty("AppUser")]
        public ICollection<AppUserIssue> AppUserIssues { get; set; }
        [InverseProperty("AppUser")]
        public ICollection<Comment> Comments { get; set; }
        public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
    }
}
