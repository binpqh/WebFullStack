using Data.Services.Interfaces;
using Data.Services.Models;
using Data.Services.Types;
using Data.Services.ViewModels.Common;
using Microsoft.EntityFrameworkCore;

namespace Data.Services.Services
{
    //author: hiki
    public class BrandService : IBrandService
    {
        private readonly BikeStoresContext _context;
        public BrandService(BikeStoresContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<IList<BrandType>>> GetAllBrands()
        {
            var brands = await _context.Brands.Select(x => new BrandType() { BrandId = x.BrandId, BrandName = x.BrandName }).ToListAsync();

            return new ApiSuccessResponse<IList<BrandType>>(brands);
        }

        public async Task<ApiResponse<BrandType>> CreateBrand(string brandName)
        {
            var checkBrandExists = await _context.Brands.FirstOrDefaultAsync(x => x.BrandName == brandName);

            if (checkBrandExists != null)
                return new ApiErrorResponse<BrandType>("Brand already exists.");

            var brand = new Brand() { BrandName = brandName };
            await _context.Brands.AddAsync(brand);
            await _context.SaveChangesAsync();

            return new ApiSuccessResponse<BrandType>() { ResultObj = new BrandType() { BrandId = brand.BrandId, BrandName = brand.BrandName }, Message = "Create Brand is success." };
        }

        public async Task<ApiResponse<int>> DeleteBrand(int brandId)
        {
            var brand = await _context.Brands.FirstOrDefaultAsync(x => x.BrandId == brandId);

            if (brand == null)
                return new ApiErrorResponse<int>($"Brand with id: {brandId.ToString()} not found.");

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return new ApiSuccessResponse<int>() { ResultObj = brandId, Message = $"Delete brand with id: {brandId.ToString()} is success." };
        }

        public async Task<ApiResponse<BrandType>> GetBrandById(int brandId)
        {
            var brand = await _context.Brands.Select(x => new BrandType() { BrandId = x.BrandId, BrandName = x.BrandName }).FirstOrDefaultAsync(x => x.BrandId == brandId);

            if (brand == null)
                return new ApiErrorResponse<BrandType>($"Brand with id: {brandId.ToString()} not found.");

            return new ApiSuccessResponse<BrandType>(brand);
        }

        public async Task<ApiResponse<BrandType>> UpdateBrand(int brandId, string brandName)
        {
            var brand = await _context.Brands.FirstOrDefaultAsync(x => x.BrandId == brandId);

            if (brand == null)
                return new ApiErrorResponse<BrandType>($"Brand with id: {brandId.ToString()} not found.");

            var checkBrandExists = await _context.Brands.FirstOrDefaultAsync(x => x.BrandName == brandName);

            if (checkBrandExists != null)
                return new ApiErrorResponse<BrandType>("Brand already exists.");

            brand.BrandName = brandName;
            await _context.SaveChangesAsync();

            return new ApiSuccessResponse<BrandType>()
            {
                ResultObj = new BrandType() { BrandId = brandId, BrandName = brandName },
                Message = $"Update brand with id: {brandId.ToString()} is success."
            };
        }
    }
}
