

using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authorization;
namespace API.Controllers
{
    public class BuggyController:BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context ) 
        { 
            _context = context;

        }  
        [Authorize]
        [Microsoft.AspNetCore.Mvc.HttpGet("auth")]  
        
        public ActionResult<string> GetSecret() 
        { 
            return "secret text";
        } 
        [Microsoft.AspNetCore.Mvc.HttpGet("not-found")] 
        public ActionResult<AppUser> GetNoFound() 
        {    
            var thing=_context.Users.Find(-1); 
            if(thing==null) return NotFound(); 

            return thing;
        }  
        [Microsoft.AspNetCore.Mvc.HttpGet("server-error")] 
        public ActionResult<string> GetServerError() 
        {  
            
            var thing=_context.Users.Find(-1); 
            var thingToReturn=thing.ToString(); 
            return thingToReturn; 

        }  
        [Microsoft.AspNetCore.Mvc.HttpGet("bad-request")] 
        public ActionResult<string> GetBadRequest() 
        {  
            //will retuen 400
            return BadRequest("This was not a good request");
        } 
    }
}