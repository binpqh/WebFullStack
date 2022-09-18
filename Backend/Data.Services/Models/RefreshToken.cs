﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Models
{
    public class RefreshToken
    {
        [Key] public int Id { get; init; }
        public string RefreshTokenString { get; set; }
        public string Uid { get; set; }
        public string JwtTokenId { get; set; }
        public string? IpAddress { get; set; }
    }
}
