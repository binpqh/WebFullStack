using Data.Services.Interfaces;
using Data.Services.Models;
using Data.Services.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Services
{
    public class TokenServices : ITokenServices
    {
        private readonly IConfiguration _configuration;
        private readonly BikeStoresContext _context;
        private readonly SymmetricSecurityKey _securityKey;

        public TokenServices(IConfiguration configuration, BikeStoresContext context)
        {
            _configuration = configuration;
            _context = context;
            _securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
        }

        public async Task<AuthResult> GenerateToken(GenerateRefreshTokenInput generateRefreshTokenInput)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
            new Claim(JwtRegisteredClaimNames.NameId, generateRefreshTokenInput.Uid.ToString()),
            new Claim(ClaimTypes.Role,generateRefreshTokenInput.Role),
            new Claim(JwtRegisteredClaimNames.UniqueName, generateRefreshTokenInput.Username),
            new Claim("Ip", generateRefreshTokenInput.IpAddress)
        };

            var creds = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescription = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = creds
            };

            var jwtTokenHandler = new JwtSecurityTokenHandler();


            // Create the JWT security token and encode it.
            var token = jwtTokenHandler.CreateToken(tokenDescription);
            var jwtToken = jwtTokenHandler.WriteToken(token);


            //Create Refresh Token
            var refreshToken = new RefreshToken()
            {
                IpAddress = generateRefreshTokenInput.IpAddress,
                JwtTokenId = token.Id,
                RefreshTokenString = RandomString(25) + Guid.NewGuid(),
                Uid = generateRefreshTokenInput.Uid
            };

            await _context.RefreshToken.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return new AuthResult()
            {
                token = jwtToken,
                success = true
            };
        }

        public async Task<AuthResult> GenerateRefreshToken(string token, string? ipV4)
        {
            var verifyToken = await VerifyToken(token, ipV4);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
            new Claim(JwtRegisteredClaimNames.NameId, verifyToken.Uid),
            new Claim(JwtRegisteredClaimNames.UniqueName, verifyToken.Username),
            new Claim("Ip", verifyToken.IpAddress),
            new Claim(ClaimTypes.Role, verifyToken.Role),
        };

            var creds = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescription = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = creds
            };

            var jwtTokenHandler = new JwtSecurityTokenHandler();


            // Create the JWT security token and encode it.
            var jwtToken = jwtTokenHandler.CreateToken(tokenDescription);
            var accessToken = jwtTokenHandler.WriteToken(jwtToken);

            verifyToken.TokenStored.JwtTokenId = jwtToken.Id;
            await _context.SaveChangesAsync();
            return new AuthResult()
            {
                success = true,
                token = accessToken
            };
        }

        private async Task<VerifyTokenResult> VerifyToken(string token, string? ipV4)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var tokenReader = jwtTokenHandler.ReadJwtToken(token);
            var storedRefreshToken =
                await _context.RefreshToken.FirstOrDefaultAsync(x => x.JwtTokenId == tokenReader.Id);
            if (storedRefreshToken == null) throw new Exception("Token is invalid");

            // Check ip v4
            if (storedRefreshToken.IpAddress != ipV4) throw new Exception("Token is invalid");
            return new VerifyTokenResult()
            {
                Username = tokenReader.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.UniqueName)?.Value,
                IpAddress = ipV4,
                Uid = storedRefreshToken.Uid,
                TokenStored = storedRefreshToken,
                Role = tokenReader.Claims.First(c=>c.Type == "Role").Value
            };
        }

        private static string RandomString(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
