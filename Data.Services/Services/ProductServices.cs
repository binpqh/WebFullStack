using Data.Services.Interfaces;
using Data.Services.Models;
using Data.Services.Types;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Services
{
    public class ProductServices : IProductServices
    {
        public async Task<Product> CreateAsync(ProductType productType)
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var product = new Product
                { 
                    ProductName= productType.ProductName,
                    BrandId = productType.BrandId,
                    CategoryId =productType.CategoryId,
                    ListPrice = productType.ListPrice,

                };
               await db.Products.AddAsync(product);
               await db.SaveChangesAsync();
                return product;
            }
              
        }

        public async Task DeleteAsync(int id)
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var product = await db.Products.FindAsync(id);
                if (product !=null)
                {
                    db.Products.Remove(product);
                    await db.SaveChangesAsync();
                }
               
            }

                
        }

        public async Task<List<ProductResult>> GetAllAsync()
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var list = await db.Products.Include(p => p.Brand).Include(p=>p.Category).Select(p=>new ProductResult
                {
                    ProductName = p.ProductName,
                    BrandName = p.Brand.BrandName, 
                    ListPrice= p.ListPrice,
                    CategoryName = p.Category.CategoryName, 
                }).ToListAsync();
                if(list!=null)
                {
                    return list; 
                }
                else
                {
                    throw new Exception("Null");
                }    
            }

                
        }

        public async Task<ProductResult> GetByIdAsync(int id)
        {
            using (BikeStoresContext db = new BikeStoresContext()) 
            {
                var product = await db.Products.Where(p=>p.ProductId ==id).Include(p => p.Brand).Include(p => p.Category).Select(p=> new ProductResult
                {
                    ProductName= p.ProductName,
                    BrandName= p.Brand.BrandName,
                    CategoryName = p.Category.CategoryName,
                    ListPrice = p.ListPrice

                }).FirstOrDefaultAsync();
                if (product!=null)
                {
                    return product;
                }

            }
                throw new NotImplementedException();
        }

        public async Task<ProductResult> UpdateAsync(int id, ProductType productType)
        {
            //dang tap trung hong un dau thoi uong i tui nhin khat dc
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var item =await db.Products.Where(p=>p.ProductId==id).FirstOrDefaultAsync();
                if(item !=null)
                {

                    item.ProductName = productType.ProductName ?? item.ProductName;
                    item.BrandId = productType.BrandId ;
                    item.CategoryId = productType.CategoryId;
                    item.ListPrice = productType.ListPrice;
                    await db.SaveChangesAsync();
                }    
                else
                {
                    throw new Exception("hong tìm thấy"+id);
                }
                var result = await db.Products.Include(p => p.Brand).Include(p => p.Category).Where(p => p.ProductId == id).Select(p => new ProductResult
                {
                    ProductName = p.ProductName,
                    BrandName = p.Brand.BrandName,
                    CategoryName = p.Category.CategoryName,
                    ListPrice = p.ListPrice
                }).FirstOrDefaultAsync();
                return result;
               
            }
              
        }
    }
}
