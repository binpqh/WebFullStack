using Data.Services.Interfaces;
using Data.Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Services
{
    public class CategoryServices : ICategoryServices
    {
        public async Task<Category> CreateAsync(string nameCate)
        {
            using (BikeStoresContext db = new BikeStoresContext())
            {
                var cate = new Category
                {
                    CategoryName = nameCate
                };
                await db.Categories.AddAsync(cate);
                await db.SaveChangesAsync();
                return cate;
            }
        }

        public async Task DeleteAsync(int id)
        {
            using(BikeStoresContext db = new BikeStoresContext())
            {
                var cate = await db.Categories.FindAsync(id);
                if(cate != null)
                {
                    db.Categories.Remove(cate);
                    await db.SaveChangesAsync();
                }
            }
        }

        public async Task<List<Category>> GetAllAsync()
        {
            using(BikeStoresContext db = new BikeStoresContext())
            {
                var listcate = await db.Categories.ToListAsync();
                if(listcate == null)
                {
                    throw new Exception("Danh sách Category đang bị null nè má ơi");
                }
                return listcate;
            }
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            using(BikeStoresContext db = new BikeStoresContext())
            {
                var cate = await db.Categories.FindAsync(id);
                if(cate==null)
                {
                    throw new Exception("Hổng tìm thấy Cate có id =" + id);
                }
                else
                {
                    return cate;
                }    
            }    
        }

        public async Task<Category> UpdateAsync(int id, string nameCate)
        {
            using(BikeStoresContext db = new BikeStoresContext())
            {
                var cate = await db.Categories.FindAsync(id);
                if(cate== null)
                {
                    throw new Exception("Hong tìm thấy cate có id :" + id);
                }    
                else
                {
                    cate.CategoryName = nameCate ?? cate.CategoryName;
                }
                await db.SaveChangesAsync();
                return cate;
            }
        }
    }
}
