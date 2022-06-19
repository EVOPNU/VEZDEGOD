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

        public string? knownTech { get; set; }
        public string? wantedTech { get; set; }
        public string? wantToBeMentor { get; set; }
        public string? isNeedMentor { get; set; }
        public string? aboutMe { get; set; }
        public string? dinnerTime{ get; set; }

    }
}
