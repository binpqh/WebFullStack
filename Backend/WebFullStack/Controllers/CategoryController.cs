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
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            return Ok(await _services.GetByIdAsync(id));
        }
        [HttpGet]
        public async Task<List<Category>> GetAllAsync()
        {
            return await _services.GetAllAsync();
        }
        [HttpPost]

        public async Task<Category> CreateAsync([FromBody]Category cate)

        {

            return await _services.CreateAsync(cate.CategoryName);
        }
        [HttpPut("{id:int}")]
        public async Task<Category> UpdateAsync(int id, [FromBody] Category category)
        {
            return await _services.UpdateAsync(id, category.CategoryName);
        }
        [HttpDelete("{id:int}")]
        public async Task<Category> DeleteAsync(int id)
        {
            return await _services.DeleteAsync(id);
        }
    }
}
