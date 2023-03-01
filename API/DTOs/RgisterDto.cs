using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RgisterDto
    { 
        [Required]
        public string Username { get; set; }  
         public string KnownAs { get; set; } 
         public string Gender { get; set; }  
         public DateOnly? DateOfBirth { get; set; } // optional to make required work
         public string City { get; set; } 
         public string Country { get; set; }
        //[Required] 
        //[StringLength(8,MinimumLength =4)] 
        public string Password { get; set; }
    }
}