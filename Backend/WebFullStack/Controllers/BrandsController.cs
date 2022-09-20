using Data.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebFullStack.Controllers
{
    //author hiki
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;

        public BrandsController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBrands()
        {
            var brands = await _brandService.GetAllBrands();

            return Ok(brands);
        }

        [HttpGet("getbrandbyid/{brandId:int}")]
        public async Task<IActionResult> GetBrandById(int brandId)
        {
            var result = await _brandService.GetBrandById(brandId);

            if (!result.IsSuccessed)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateBrand([FromBody] string brandName)
        {
            var result = await _brandService.CreateBrand(brandName);

            if (!result.IsSuccessed)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPut("update/{brandId:int}")]
        public async Task<IActionResult> UpdateBrand(int brandId, [FromBody] string brandName)
        {
            var result = await _brandService.UpdateBrand(brandId, brandName);

            if (!result.IsSuccessed)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("delete/{brandId:int}")]
        public async Task<IActionResult> DeteleBrand(int brandId)
        {
            var result = await _brandService.DeleteBrand(brandId);

            if (!result.IsSuccessed)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
