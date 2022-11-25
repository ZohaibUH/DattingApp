

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }  
        public string UserName { get; set; } 
        public string PhotoUrl { get; set; } 
        public int Age {get;  set;}  
        public string knwonAs {get; set;}  
        public DateTime created {get; set;}
        public DateTime LastActive {get; set;}  
        public string Gender {get; set;} 
        public string intorduction { get; set; }  
        public string Lookingfor { get; set; }  
        public string interests {get; set;} 
        public string city { get; set; }  
        public string Country { get; set; } 
        public  List<PhotoDto> Photos { get; set; }=new ();
    }
}