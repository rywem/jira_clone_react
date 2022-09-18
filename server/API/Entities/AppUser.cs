using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string AvatarUrl { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Issue> Issues { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Project> Projects { get; set; }
    }
}
