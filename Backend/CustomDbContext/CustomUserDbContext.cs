using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.CustomDbContext
{
    public class CustomUserDbContext : DbContext
    {

        public CustomUserDbContext() 
        {
            Database.EnsureCreated();
          
        }
        public DbSet<CustomUser> customUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
              "server=localhost;user=root;password=EnderWarAdmin;database=vezdecode;",
                new MySqlServerVersion(new Version(8, 0, 27))
            );
        }
    }
}
