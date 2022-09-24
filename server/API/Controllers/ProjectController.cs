using API.Entities;
using API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectRepository _projectRepository;

        public ProjectController(ProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Project project)
        {
            try
            {
                var result = await _projectRepository.CreateAsync(project);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetProject(int projectId)
        {
            try
            {
                var result = await _projectRepository.GetProjectWithUsersAndIssuesAsync(projectId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] Project project)
        {
            try
            {
                var result = await _projectRepository.UpdateAsync(project);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _projectRepository.GetAllAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
