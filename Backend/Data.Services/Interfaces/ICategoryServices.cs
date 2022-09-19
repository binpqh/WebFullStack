using Data.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Interfaces
{
    public interface ICategoryServices
    {
        Task<List<Category>> GetAllAsync();
        Task<Category> GetByIdAsync(int id);
        Task<Category> CreateAsync(string nameCate);
<<<<<<< HEAD
        Task<Category> UpdateAsync(int id,string nameCate);
        Task<Category>  DeleteAsync(int id);
=======
        Task<Category> UpdateAsync(int id, string nameCate);
        Task<Category> DeleteAsync(int id);
>>>>>>> baaaffb484af264d30e7e5ce706a61f5d40432c6
    }
}
