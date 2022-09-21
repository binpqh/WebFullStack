using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Uid { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasData(new Account
            {
                Uid = "admin",
                Username = "Bin đẹp troai",
                Password = "admin1",
                Role = "Admin"
            });
        }
    }
}
