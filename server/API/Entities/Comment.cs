using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedUtc { get; set; }
        public DateTime UpdatedUtc { get; set; }
        
        public string AppUserId { get; set; }
        [ForeignKey("AppUserId")]
        public AppUser AppUser { get; set; }
        public int IssueId { get; set; }
        [ForeignKey("IssueId")]
        public Issue Issue { get; set; }
        //User
    }
}
