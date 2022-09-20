namespace Data.Services.ViewModels.Common
{
    //author: hiki
    public class ApiErrorResponse<T> : ApiResponse<T>
    {
        public string[] ValidationErrors { get; set; } = null!;

        public ApiErrorResponse()
        {
        }

        public ApiErrorResponse(string message)
        {
            IsSuccessed = false;
            Message = message;
        }

        public ApiErrorResponse(string[] validationErrors)
        {
            IsSuccessed = false;
            ValidationErrors = validationErrors;
        }
    }
}
