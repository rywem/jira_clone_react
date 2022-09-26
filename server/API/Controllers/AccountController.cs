using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, SignInManager<AppUser> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            try
            {
                if (await UserExists(registerDto.Username))
                    return BadRequest("Username is taken.");

                //var result = await Mediator.Send(new Register.Command() { RegisterDto = registerDto });
                var user = _mapper.Map<AppUser>(registerDto);
                user.UserName = registerDto.Username.ToLower();

                var result = await _userManager.CreateAsync(user, registerDto.Password);

                var roleResult = await _userManager.AddToRoleAsync(user, "Member");

                if (!roleResult.Succeeded)
                    return BadRequest();

                if (!result.Succeeded)
                    return BadRequest("Invalid");

                var response = new UserDto()
                {
                    Username = user.UserName,
                    Token = await _tokenService.CreateToken(user)
                };
                return Ok(response);
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if ( user == null )
                return null;

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if ( !result.Succeeded )
                return Unauthorized("Invalid");

            var response = new UserDto() 
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };

            return Ok(response);
        }
        
    }
}
