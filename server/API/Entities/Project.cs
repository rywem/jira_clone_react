using API.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime CreatedUtc { get; set; }
        public DateTime UpdatedUtc { get; set; }
        public ProjectCategory Category { get; set; }
        [InverseProperty(nameof(Issue.Project))]
        public ICollection<Issue> Issues { get; set; }
        [InverseProperty(nameof(AppUserProject.Project))]
        public ICollection<AppUserProject> AppUserProjects { get; set; }
    }
}