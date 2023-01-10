
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser :IdentityUser<int>
   // :IdentityUser<int>
    {
       
        public DateOnly DateOfBirth {get;  set;}  
        public string KnownAs {get; set;}  
        public DateTime created {get; set;}=DateTime.UtcNow;  
        public DateTime LastActive {get; set;}=DateTime.UtcNow;  
        public string Gender {get; set;} 
        public string Introduction { get; set; }  
        public string LookingFor { get; set; }  
        public string Interests {get; set;} 
        public string City { get; set; }  
        public string Country { get; set; } 
        public  List<Photo> Photos { get; set; }=new ();

       // public int GetAge() 
        //{ 
          //  return DateOfBirth.CalculateAge();
       // }
      // public ICollection<AppUserRole> UserRoles { get; set; }
      public List<UserLike> LikedByUsers { get; set; }  //many to many relationship 
      public List<UserLike> LikedUsers { get; set; } 
      public ICollection<AppUserRole> UserRoles { get; set; } 
      public List<Message> MessageSent{get; set;}  
      public List<Message> MessageRecieved{get; set;} 


    }
}