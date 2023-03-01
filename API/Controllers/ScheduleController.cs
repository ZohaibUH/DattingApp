
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Security;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using Microsoft.Extensions.Options;
using API.Helpers;
using System.Text;

namespace API.Controllers
{ 
    [Authorize]
    public class ScheduleController:BaseApiController
    { 
        public ScheduleController(){ 
            
        } 

        [HttpGet]
        public async Task<ActionResult<string>> GetScheduleFiles()  
        { 
          try{ 
            string output; 
            string path=@"C:\schedule-bat\log.txt";
            using (StreamReader streamReader = new StreamReader(path))
            {
                output = streamReader.ReadToEnd();
            }
            return   output; 
            } 
            catch(Exception ex) 
            {  

              return NoContent();
            }
        } 
         [HttpGet("{*filename}")] 
        public  async Task<ActionResult<string>> ExecuteBatchFile(string filename)
        {   string name=filename.Replace("/","\\");  
          try 
            { 
             string path=@"C:\schedule-bat\SOP-filename.txt";
                using (var tw = new StreamWriter(path, false))
                {
                     tw.WriteLine(name);
                } 
            return NoContent();
                
            } 
            catch(Exception ex)
            {
                return NoContent();
            } 
            
        }

    }
}