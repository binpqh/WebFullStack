using Microsoft.Extensions.Configuration;
using WebFullStack.Configure;
using WebFullStack.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var configure = builder.Configuration;
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigSwagger();
builder.Services.ConfigureControllers();
builder.Services.ConfigureCors();
builder.Services.ConfigureDatabase(configure);
builder.Services.ConfigAccount(configure);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<AuthMiddleware>();
app.UseResponseParser();
app.MapControllers();

app.Run();
