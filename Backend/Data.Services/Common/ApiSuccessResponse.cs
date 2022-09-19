namespace Data.Services.ViewModels.Common
{
    //author: hiki
    public class ApiSuccessResponse<T> : ApiResponse<T>
    {
        public ApiSuccessResponse(T resultObj)
        {
            IsSuccessed = true;
            ResultObj = resultObj;
        }

        public ApiSuccessResponse()
        {
            IsSuccessed = true;
            Message = "Successful";
        }

        public ApiSuccessResponse(string message)
        {
            IsSuccessed = true;
            Message = message;
        }
    }
}
