using Data.Services.Models;
using Data.Services.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Interfaces
{
   public interface IStoreServices
    {

        Task<List<Store>> GetAllAsync();
        Task<Store> GetByIdAsync(int id);
        Task<Store> CreateAsync(StoreInput create);
        Task<Store> UpdateAsync(int id, StoreInput update);
        Task DeleteAsync(int id);

    }
}
