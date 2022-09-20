using Data.Services.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Interfaces
{
    public interface ITokenServices
    {
        Task<AuthResult> GenerateToken(GenerateRefreshTokenInput generateRefreshTokenInput);
        Task<AuthResult> GenerateRefreshToken(string token, string? ipV4);
    }
}
