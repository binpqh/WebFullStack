using Data.Services.Models;
using Data.Services.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Interfaces
{
    public interface IBrandServices
    {
        Task<List<Brand>> GetAllAsync();
        Task<Brand> GetByIdAsync(int id);
        Task<Brand> CreateAsync(Brand brandInput);
        Task<Brand> UpdateAsync(int id, Brand brand);
        Task DeleteAsync(int id);
    }
}
