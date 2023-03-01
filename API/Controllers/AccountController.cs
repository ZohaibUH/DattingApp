using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        
        private readonly ITokenService _tokenService;
         private readonly IHttpContextAccessor _httpContext;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService,IMapper mapper)
        {
            
           _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
           

        } 
     [HttpPost("register")] 
     public async Task<ActionResult<UserDto>> Register(RgisterDto registerDto)   
     {    
        
        if(await UserExists(registerDto.Username)) {  
            
            var user = await _userManager.Users 
         .Include(p=>p.Photos)
         .SingleOrDefaultAsync(x => x.UserName==registerDto.Username); 
        if(user==null)return Unauthorized("Invalid Username");  
        var results=await _userManager.CheckPasswordAsync(user,"Pa$$w0rd");  
        if(!results) return Unauthorized("Invalid Password"); 
         return new UserDto { 
            Username= user.UserName, 
            Token =await _tokenService.CreateToken(user) ,  
            PhotoUrl=user.Photos.FirstOrDefault(x=>x.IsMain)?.Url, 
            KnownAs=user.KnownAs, 
            Gender=user.Gender 
        }; 
        }  
        else 
        {
        var user =_mapper.Map<AppUser>(registerDto);
       //   using var hmac=new HMACSHA512(); 
             
        user.UserName=registerDto.Username.ToLower(); 
      //   user.PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
      //   user.PasswordSalt=hmac.Key;
       
     //   _context.Users.Add(user); 
       // await _context.SaveChangesAsync();  
      var result= await _userManager.CreateAsync(user,"Pa$$w0rd"); 
       if(!result.Succeeded) return BadRequest(result.Errors); 
       //var roleResult=await _userManager.AddToRoleAsync(user,"Member");
      // if(!roleResult.Succeeded) return BadRequest(roleResult.Errors); 
         
         return new UserDto { 
            Username= user.UserName, 
            Token =await _tokenService.CreateToken(user) ,  
            KnownAs=user.KnownAs, 
            Gender=user.Gender
         
        }; 
        }
     }  
     [HttpPost("login")] 
     public async Task<ActionResult<UserDto>> Login(LoginDto logindto) 
     { 
        var user = await _userManager.Users 
         .Include(p=>p.Photos)
         .SingleOrDefaultAsync(x => x.UserName==logindto.Username); 
        if(user==null)return Unauthorized("Invalid Username");  
        var result=await _userManager.CheckPasswordAsync(user,logindto.Password);  
        if(!result) return Unauthorized("Invalid Password");

       /* using var hmac= new HMACSHA512(user.PasswordSalt); 
        var computedHash =hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));  
        for (int i=0; i<computedHash.Length; i++) 
        {  
            if(computedHash[i]!= user.PasswordHash[i] ) 
            { 
                return Unauthorized("Invalid Password");
            }

        } */
        return new UserDto { 
            Username= user.UserName, 
            Token = await _tokenService.CreateToken(user), 
             PhotoUrl=user.Photos.FirstOrDefault(x=>x.IsMain)?.Url, 
             KnownAs=user.KnownAs, 
             Gender=user.Gender
        };
     } 
      [HttpPost("verify")]
        public async Task<IActionResult> GetUserProfile()
        {   
        
         string path = @"C:\test\test.txt";
         using (var tw = new StreamWriter(path, true))
            {
                tw.WriteLine("hello");
            }
               
            return NotFound();
        } 

     private async Task<bool> UserExists(string username) 
     { 
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
     }
    }
}