using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUserProject
    {
        public string AppUserId { get; set; }
        [ForeignKey("AppUserId")]
        public AppUser AppUser { get; set; }
        public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
    }
}
