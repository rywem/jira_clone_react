using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            comment.CreatedUtc = DateTime.UtcNow;
            comment.UpdatedUtc = DateTime.UtcNow;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var comment = _context.Comments.FirstOrDefault(x => x.Id == id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
                return true;
            }
            else
                return false;
        }

        public async Task<Comment> UpdateAsync(Comment comment)
        {
            var objFromDb = _context.Comments.FirstOrDefault(x => x.Id == comment.Id);
            if (objFromDb != null)
            {
                objFromDb.Body = comment.Body;
                objFromDb.UpdatedUtc = DateTime.UtcNow;
                _context.Comments.Update(objFromDb);
                await _context.SaveChangesAsync();
                return comment;
            }
            else
                throw new Exception("Not found in database");
        }

        public async Task<List<Comment>> GetCommentsByIssueId(int issueId)
        {
            return await _context.Comments.Where(x => x.IssueId == issueId).ToListAsync();
        }
    }
}
