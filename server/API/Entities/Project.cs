using API.Enums;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public ProjectCategory Category { get; set; }
        public ICollection<Issue> Issues { get; set; }
        public ICollection<AppUser> AppUsers { get; set; }
    }
}