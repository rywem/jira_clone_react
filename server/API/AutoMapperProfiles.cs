using API.DTOs;
using API.Entities;
using AutoMapper;
namespace API
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
        }
    }
}
