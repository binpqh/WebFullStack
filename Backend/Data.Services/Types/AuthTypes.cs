using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Types
{
    public class AuthInput
    {
        [Required] public string Uid { get; set; }
        [Required] public string Password { get; set; }
        [Required] public string? IpAddress { get; set; }
    }
    public class ChangePassword
    {
        [Required] public string OldPassword { get; set; }
        [Required] public string NewPassword { get; set; }
        [Required] public string ConfirmPassword { get; set; }
    }

    public class GetMeResponse
    {
        public string Name { get; set; }
        public string Role { get; set; }
    }
}
