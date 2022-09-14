using Data.Services;
using Data.Services.Interfaces;
using Data.Services.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryServices _services;
        public CategoryController(ICategoryServices services)
        {
            _services = services;
        }
        [HttpGet("{id:int}")]
        public async Task<Category> GetByIdAsync(int id)
        {
            return await _services.GetByIdAsync(id);
        }
        [HttpGet]
        public async Task<List<Category>> GetAllAsync()
        {
            return await _services.GetAllAsync();
        }
        [HttpPost]
        public async Task<Category> CreateAsync(string nameCate)
        {
            return await _services.CreateAsync(nameCate);
        }
        [HttpPut("{id:int}")]
        public async Task<Category> UpdateAsync(int id, string nameCate)
        {
            return await _services.UpdateAsync(id, nameCate);
        }
        [HttpDelete]
        public async Task DeleteAsync(int id)
        {
            await _services.DeleteAsync(id);
        }
    }
}
