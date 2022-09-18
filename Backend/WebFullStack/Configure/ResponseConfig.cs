using Microsoft.AspNetCore.Diagnostics;
using WebFullStack.Defined;

namespace WebFullStack.Configure
{
    public static class ResponseConfig
    {
        public static void ConfigureErrorResponse(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(c => c.Run(async context =>
            {
                var exception = context.Features
                    .Get<IExceptionHandlerPathFeature>()
                    .Error;

                const ResponseCodes code = ResponseCodes.InternalServerError;
                var desc = exception.Message;

                await context.Response.WriteAsJsonAsync(new
                {
                    Code = code,
                    Desc = desc
                });
            }));
        }
    }
}
