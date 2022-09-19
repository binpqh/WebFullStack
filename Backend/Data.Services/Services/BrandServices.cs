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
    public class BrandServices : IBrandServices
    {
        public async Task<Brand> CreateAsync(Brand brandinput)
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var brand = new Brand
                {
                    BrandName = brandinput.BrandName,
                };
                await db.Brands.AddAsync(brand);
                await db.SaveChangesAsync();
                return brand;
            }
        }

        public async Task DeleteAsync(int id)
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var brand = await db.Brands.FindAsync(id);
                if (brand != null)
                {
                    db.Brands.Remove(brand);
                    await db.SaveChangesAsync();
                }
            }
        }

        public async Task<List<Brand>> GetAllAsync()
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var listBrand = await db.Brands.ToListAsync();
                if (listBrand != null)
                    return listBrand;
                else
                {
                    throw new Exception("Null");
                }
            }
        }

        public async Task<Brand> GetByIdAsync(int id)
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var brand = await db.Brands.FindAsync(id);
                if (brand != null)
                    return brand;
                else
                {
                    throw new Exception("Null");
                }
            }
        }

        public async Task<Brand> UpdateAsync(int id, Brand brandinput)
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var brand = await db.Brands.FindAsync(id);
                if(brand != null)
                {
                    brand.BrandName = brandinput.BrandName ?? brand.BrandName;
                }
                await db.SaveChangesAsync();
                return brand;
            }
        }
    }
}
