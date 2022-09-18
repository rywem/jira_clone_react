using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string AvatarUrl { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        [InverseProperty("AppUser")]
        public ICollection<AppUserIssue> AppUserIssues { get; set; }
        [InverseProperty("AppUser")]
        public ICollection<Comment> Comments { get; set; }
        public Project Project { get; set; }
    }
}
