using Data.Services.Interfaces;
using Data.Services.Models;
using Data.Services.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Services
{
    public class StoreServices : IStoreServices
    {
        private readonly BikeStoresContext _db;
        public StoreServices(BikeStoresContext db)
        {
            _db = db;
        }
        public async Task<Store> CreateAsync(StoreInput create)
        {
            var store = new Store
            {

                 StoreName = create.StoreName,
                 Email=create.Email,
                 City=create.City,
                 Phone=create.Phone,
                 Street=create.Street,
                 State=create.State,
                 ZipCode=create.ZipCode
    };
            if (store != null)
            {
                await _db.Stores.AddAsync(store);
                await _db.SaveChangesAsync();
            }
            else
            {
                throw new Exception("product is null");
            }
            return store;
        }

        public async Task DeleteAsync(int id)
        {
            var store = await _db.Stores.FindAsync(id);
            if (store != null)
            {
                 _db.Stores.Remove(store);
                await _db.SaveChangesAsync();
            }
        }

        public async Task<List<Store>> GetAllAsync()
        {
            var liststore = await _db.Stores.ToListAsync();
            if (liststore == null)
            {
                throw new Exception("list null");
            }
            return liststore;
        }

        public async Task<Store> GetByIdAsync(int id)
        {
            var store = await _db.Stores.FindAsync(id);
            if (store == null)
            {
                throw new Exception("Not find store id =" + id);
            }
            else
            {
                return store;
            }
        }

        public async Task<Store> UpdateAsync(int id, StoreInput update)
        {
            var store = await _db.Stores.FindAsync(id);
            if (store == null)
            {
                throw new Exception("Not find store id :" + id);
            }
            else
            {
                store.StoreName = update.StoreName ?? store.StoreName;
                store.Phone = update.Phone;
                store.Email = update.Email;
                store.Street = update.Street;   
                store.City = update.City;
                store.State = update.State;
                store.ZipCode = update.ZipCode;

            }
            await _db.SaveChangesAsync();
            return store;
        }
    }
}
