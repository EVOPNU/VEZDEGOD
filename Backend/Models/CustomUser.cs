using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class CustomUser
    {
        public int id { get; set; }
        public string? lastName { get; set; }

        public string? firstName { get; set; }

        [EmailAddress]
        public string? emailAddress { get; set; }

    }
}
