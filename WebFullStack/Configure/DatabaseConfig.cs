using Data.Services;
using Data.Services.Interfaces;
using Data.Services.Services;

namespace WebFullStack.Configure
{
    public static class DatabaseConfig
    {
        public static void ConfigureDatabase(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddScoped((_) => new BikeStoresContext());
            //services.AddScoped<Interface,Services>();
            services.AddScoped<ICategoryServices, CategoryServices>();
        }
    }
}
