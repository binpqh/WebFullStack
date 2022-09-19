namespace Data.Services.ViewModels.Common
{
    //author: hiki
    public class ApiResponse<T>
    {
        public bool IsSuccessed { get; set; }

        public int StatusCode { get; set; }

        public string Message { get; set; } = null!;

        public T? ResultObj { get; set; }
    }
}
