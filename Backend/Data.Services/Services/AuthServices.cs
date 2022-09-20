using Data.Services.Interfaces;
using Data.Services.Types;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Services
{
    public class AuthServices : IAuthService
    {
        private readonly ITokenServices _tokenService;
        public AuthServices(ITokenServices tokenService)
        {
            _tokenService = tokenService;
        }

        public async Task ChangePassword(string uid, ChangePassword req)
        {
            using (BikeStoresContext _context = new BikeStoresContext())
            {
                var user = await _context.Accounts.FirstOrDefaultAsync(x => x.Uid == uid);
                if(user == null)
                {
                    throw new Exception("Người dùng không tồn tại");
                }
                if (req.NewPassword != req.ConfirmPassword)
                {
                    throw new System.InvalidOperationException($"ConfirmPassword không đúng!!!");
                }

                if ((!string.IsNullOrEmpty(req.NewPassword) || !string.IsNullOrWhiteSpace(req.NewPassword)) &&
                    (!string.IsNullOrEmpty(req.OldPassword) || !string.IsNullOrWhiteSpace(req.OldPassword)))
                {
                    var currPass = req.OldPassword;

                    if (currPass != user.Password)
                    {
                        throw new System.InvalidOperationException($"Nhập sai mật khẩu cũ");
                    }

                    var newPass = req.NewPassword;

                    user.Password = newPass;
                }

                await _context.SaveChangesAsync();
            }    
        }
        public async Task<GetMeResponse> GetMe(string uid)
        {
            using(BikeStoresContext _context = new BikeStoresContext())
            {
                var account = await _context.Accounts.FirstOrDefaultAsync(x => x.Uid== uid);
                if (account == null)
                {
                    throw new Exception("Người dùng không tồn tại");
                }

                return new GetMeResponse()
                {
                    Name = $"{account.Username}",
                    Role = account.Role
                };
            }    
        }

        public Task<AuthResult> Login(AuthInput input)
        {
            using(BikeStoresContext _context = new BikeStoresContext())
            {
                var user = _context.Accounts.FirstOrDefault(x => x.Uid == input.Uid);
                if (user == null)
                {
                    throw new Exception("Người dùng không tồn tại");
                }

///if (user.Password != input.Password.ToSHA256())
///thêm hashpass như vầy là uci nè custom hashpass nhen,lấy framework ngoài là ngta lựm cái 1
                if (user.Password != input.Password)
                {
                    throw new Exception("Mật khẩu không đúng");
                }

                var token = _tokenService.GenerateToken(new GenerateRefreshTokenInput()
                {
                    Username = user.Username,
                    IpAddress = input.IpAddress,
                    Uid = input.Uid,
                    Role = user.Role
                });
                return token;
            }    
        }
    }
}
