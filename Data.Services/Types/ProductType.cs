using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services.Types
{
    public class ProductType
    {

        public string ProductName { get; set; } = null!;
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public short ModelYear { get; set; }
        public decimal ListPrice { get; set; }
    }
    public class ProductResult
    {
        public string ProductName { get; set; } = null!;
        public string BrandName { get; set; }
        public string CategoryName { get; set; }
        public short ModelYear { get; set; }
        public decimal ListPrice { get; set; }
    }

}
