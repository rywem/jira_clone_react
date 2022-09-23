using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProjectRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Project> CreateAsync(Project project)
        {
            project.CreatedUtc = DateTime.UtcNow;
            project.UpdatedUtc = DateTime.UtcNow;
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project> GetProjectWithUsersAndIssuesAsync(int projectId)
        {
            var project = await _context.Projects
                .Include("Issues")
                .Include("AppUsers")
                .FirstOrDefaultAsync(x => x.Id == projectId);
            return project;
        }

        public async Task<Project> UpdateAsync(Project project)
        {
            var objFromDb = _context.Projects.FirstOrDefault(x => x.Id == project.Id);

            if(objFromDb != null)
            {
                objFromDb.UpdatedUtc = DateTime.UtcNow;
                objFromDb.Url = project.Url;
                objFromDb.Description = project.Description;
                objFromDb.Category = project.Category;
                _context.Projects.Update(objFromDb);
                await _context.SaveChangesAsync();
                return objFromDb;
            }
            throw new Exception("Project not found in DB");
        }
    }
}
