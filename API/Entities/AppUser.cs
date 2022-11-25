using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }  
        public string UserName { get; set; } 
        public byte[] PasswordHash {get; set;} 
        public byte[] PasswordSalt {get; set;} 
        public DateOnly DateOfBirth {get;  set;}  
        public string knwonAs {get; set;}  
        public DateTime created {get; set;}=DateTime.UtcNow;  
        public DateTime LastActive {get; set;}=DateTime.UtcNow;  
        public string Gender {get; set;} 
        public string intorduction { get; set; }  
        public string Lookingfor { get; set; }  
        public string interests {get; set;} 
        public string city { get; set; }  
        public string Country { get; set; } 
        public  List<Photo> Photos { get; set; }=new ();

       // public int GetAge() 
        //{ 
          //  return DateOfBirth.CalculateAge();
       // }



    }
}