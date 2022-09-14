using Data.Services.Interfaces;
using Data.Services.Models;
using Data.Services.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductServices _services;
        public ProductController(IProductServices services)
        {
            _services = services;
        }
        [HttpGet("{id:int}")]
        public async Task<ProductResult> GetByIdAsync(int id)
        {
            return await _services.GetByIdAsync(id);
        }
        [HttpGet]
        public async Task<List<ProductResult>> GetAllAsync()
        {
            return await _services.GetAllAsync();
        }
        [HttpPost]
        public async Task<Product> CreateAsync(ProductType productType)
        {
            return await _services.CreateAsync(productType);
        }
        [HttpPut("{id:int}")]
        public async Task<ProductResult> UpdateAsync(int id, ProductType product)
        {
            return await _services.UpdateAsync(id, product);
        }
        [HttpDelete]
        public async Task DeleteAsync(int id)
        {
            await _services.DeleteAsync(id);
        }
    }
}
