using API;
using API.Data;
using API.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string connString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddScoped<CommentRepository>();
builder.Services.AddScoped<IssueRepository>();
builder.Services.AddScoped<ProjectRepository>();
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                              "http://localhost:3000")
                                              .AllowAnyHeader()
                                              .AllowAnyMethod()
                                              .AllowCredentials();
                      });
});

// builder.Services.AddCors(options =>
// {
//      options.AddDefaultPolicy(
//         builder =>
//         {
//             builder.WithOrigins("https://localhost:3000")
//             .AllowAnyHeader()
//             .AllowAnyMethod()
//             .AllowCredentials();
//         });
// });
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseSqlite(connString);

    opt.EnableSensitiveDataLogging();
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
