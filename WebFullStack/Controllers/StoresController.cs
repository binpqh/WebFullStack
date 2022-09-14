using Data.Services.Interfaces;
using Data.Services.Models;
using Data.Services.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly IStoreServices _services;
        public StoresController(IStoreServices services)
        {
            _services = services;
        }
        [HttpGet("{id:int}")]
        public async Task<Store> GetByIdAsync(int id)
        {
            return await _services.GetByIdAsync(id);
        }
        [HttpGet]
        public async Task<List<Store>> GetAllAsync()
        {
            return await _services.GetAllAsync();
        }
        [HttpPost]
        public async Task<Store> CreateAsync(StoreTypes create)
        {
            return await _services.CreateAsync(create);
        }
        [HttpPut("{id:int}")]
        public async Task<Store> UpdateAsync(int id, StoreTypes update)
        {
            return await _services.UpdateAsync(id, update);
        }
        [HttpDelete]
        public async Task DeleteAsync(int id)
        {
            await _services.DeleteAsync(id);
        }
    }
}
