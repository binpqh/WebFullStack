using Data.Services.Models;
using Data.Services.Types;
using Data.Services.ViewModels.Common;

namespace Data.Services.Interfaces
{
    //author: hiki
    public interface IBrandService
    {
        Task<ApiResponse<IList<BrandType>>> GetAllBrands();

        Task<ApiResponse<BrandType>> GetBrandById(int brandId);

        Task<ApiResponse<BrandType>> CreateBrand(string brandName);

        Task<ApiResponse<BrandType>> UpdateBrand(int brandId, string brandName);

        Task<ApiResponse<int>> DeleteBrand(int brandId);

    }
}
