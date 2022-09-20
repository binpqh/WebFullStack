using Microsoft.AspNetCore.Mvc;
using WebFullStack.Types;

namespace WebFullStack.Configure
{
    public static class ControllerConfig
    {
        public static void ConfigureControllers(this IServiceCollection services)
        {
            services.AddControllers()
                // .SetCompatibilityVersion(CompatibilityVersion.Latest)
                .ConfigureApiBehaviorOptions(options =>
                {
                    // Viết lại response 400
                    options.InvalidModelStateResponseFactory = context => new BadRequestObjectResult(new BadRequestResponse(context));
                });
        }
    }
}
