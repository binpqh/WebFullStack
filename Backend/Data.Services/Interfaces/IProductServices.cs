using Data.Services.Models;
using Data.Services.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Interfaces
{
    public interface IProductServices
    {
        Task<List<ProductResult>> GetAllAsync();
        Task<ProductResult> GetByIdAsync(int id);
        Task<Product> CreateAsync(ProductInput productType );
        Task<ProductResult> UpdateAsync(int id, ProductInput productResult);
        Task DeleteAsync(int id);
    }
}
