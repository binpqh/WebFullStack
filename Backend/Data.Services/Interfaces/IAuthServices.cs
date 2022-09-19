using Data.Services.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult> Login(AuthInput input);
        Task<GetMeResponse> GetMe(string uid);
        Task ChangePassword(string uid, ChangePassword req);
    }
}
