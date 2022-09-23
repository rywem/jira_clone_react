using API.DTOs;
using API.Entities;
using API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class IssueController : ControllerBase
    {
        private readonly IssueRepository _issueRepository;

        public IssueController(IssueRepository issueRepository)
        {
            _issueRepository = issueRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Issue issue)
        {
            try
            {
                var newIssue = await _issueRepository.CreateAsync(issue);
                return Ok(newIssue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _issueRepository.DeleteAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] Issue issue)
        {
            try
            {
                var result = await _issueRepository.UpdateAsync(issue);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{issueId}")]
        public async Task<IActionResult> GetIssueWithUsersAndComments(int issueId)
        {
            try
            {
                var result = await _issueRepository.GetIssueWithUsersAndCommentsAsync(issueId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchIssues([FromBody] SearchIssueDto searchIssue)
        {
            try
            {
                var results = await _issueRepository.SearchIssuesAsync(searchIssue);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
