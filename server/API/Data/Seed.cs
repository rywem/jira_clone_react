using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>()
                {
                    new AppUser() { AvatarUrl  = "https://thiscatdoesnotexist.com/", UserName = "bob", Email = "bob@test.com"},
                    new AppUser() { AvatarUrl  = "https://thiscatdoesnotexist.com/", UserName = "tom", Email = "tom@test.com"},
                    new AppUser() { AvatarUrl  = "https://thiscatdoesnotexist.com/", UserName = "jane", Email = "jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Password1!");
                }
            }
        }
    }
}
