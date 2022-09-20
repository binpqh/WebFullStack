using System.ComponentModel.DataAnnotations;

namespace WebFullStack.Types
{
    public class LoginInput
    {
        [Required] public string Uid { get; set; }
        [Required] public string Password { get; set; }
    }

    public class RefreshTokenInput
    {
        [Required] public string Token { get; set; }
    }
}
