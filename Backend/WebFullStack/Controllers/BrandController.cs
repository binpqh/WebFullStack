using Data.Services.Interfaces;
using Data.Services.Models;
using Data.Services.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandServices _services;
        public BrandController(IBrandServices services)
        {
            _services = services;
        }
        [HttpGet("{id:int}")]
        public async Task<Brand> GetByIdAsync(int id)
        {
            return await _services.GetByIdAsync(id);
        }
        [HttpGet]
        public async Task<List<Brand>> GetAllAsync()
        {
            return await _services.GetAllAsync();
        }
        [HttpPost]
        public async Task<Brand> CreateAsync(Brand brandInput)
        {
            return await _services.CreateAsync(brandInput);
        }
        [HttpPut("{id:int}")]
        public async Task<Brand> UpdateAsync(int id, [FromBody] Brand brand)
        {
            return await _services.UpdateAsync(id, brand);
        }
        [HttpDelete("{id:int}")]
        public async Task DeleteAsync(int id)
        {
            await _services.DeleteAsync(id);
        }

    }
}
