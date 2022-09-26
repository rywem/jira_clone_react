using System.Text;
using API.Data;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddScoped<TokenService>();
            //services.AddIdentityCore<AppUser>(opt =>
            //{
            //    opt.Password.RequireNonAlphanumeric = false;
            //    opt.SignIn.RequireConfirmedEmail = false;
            //    opt.User.RequireUniqueEmail = false;
            //})
            //    .AddRoles<AppRole>()
            //    .AddUserManager<UserManager<AppUser>>()
            //    .AddRoleManager<RoleManager<AppRole>>()
            //    .AddSignInManager<SignInManager<AppUser>>()
            //    .AddRoleValidator<RoleValidator<AppRole>>()
            //    .AddEntityFrameworkStores<ApplicationDbContext>();

            //services.AddIdentity<AppUser, AppRole>(opt =>
            //{
            //    opt.Password.RequireNonAlphanumeric = false;
            //    opt.SignIn.RequireConfirmedEmail = false;
            //    opt.User.RequireUniqueEmail = false;
            //})                
            //    .AddEntityFrameworkStores<ApplicationDbContext>()
            //    .AddDefaultTokenProviders();
                


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenSecret"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            return services;
        }
    }
}
