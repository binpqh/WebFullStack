using Data.Services.Interfaces;
using Data.Services.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebFullStack.Types;

namespace WebFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenServices _tokenService;
        public AuthController(IAuthService authService, ITokenServices tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }
        [HttpPost]
        [Route("login")]
        public async Task<AuthResult> Login([FromBody] LoginInput loginInput)
        {
            var request = new AuthInput()
            {
                Uid = loginInput.Uid,
                Password = loginInput.Password,
                IpAddress = Request.HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString()
            };
            return await _authService.Login(request); ;
        }

        [HttpPost]
        [Route("refreshToken")]
        public async Task<AuthResult> RefreshToken([FromBody] RefreshTokenInput tokenInput)
        {
            var ipAddress = Request.HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString();
            return await _tokenService.GenerateRefreshToken(tokenInput.Token, ipAddress);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("user")]
        public async Task<GetMeResponse> GetUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(userId == null)
            {
                throw new Exception("Không tìm thấy tên người dùng");
            }
            var user = await _authService.GetMe(userId);
            return user;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("changePassword")]
        public async Task ChangePassword(ChangePassword req)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new Exception("Không tìm thấy tên người dùng");
            }
            await _authService.ChangePassword(userId, req);
        }
    }
}
