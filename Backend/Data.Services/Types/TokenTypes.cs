using Data.Services.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Types
{
    public class GenerateRefreshTokenInput
    {
        public string Uid { get; set; }
        public string Username { get; set; }
        public string? IpAddress { get; set; }
        public string Role { get; set; }
    }
    public class AuthResult
    {
        public string token { get; set; }
        public bool success { get; set; } = false;
    }
    public class VerifyTokenResult
    {
        public string Uid { get; set; }
        public string? Username { get; set; }
        public string? IpAddress { get; set; }
        public string Role { get; set; }
        public RefreshToken TokenStored { get; set; }
    }
}
