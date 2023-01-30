
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Security;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using Microsoft.Extensions.Options;
using API.Helpers;

namespace API.Controllers
{ 
  [Authorize]
    public class StudyFolderController :BaseApiController
    {
        private readonly IStudyFolder _studyFolder;
        private readonly IOptions<ITRSettings> _config;
        public StudyFolderController(IStudyFolder studyFolder,IOptions<ITRSettings> config) 
        { 
            _config = config;
           _studyFolder = studyFolder;  
           _studyFolder.Run();
           
           
        } 
     [HttpGet]
     public async Task< ActionResult<string>> GetOpenFiles()  
     {  
   int exitCode;
            ProcessStartInfo psi = new ProcessStartInfo();
            Process process;
    //        psi.WorkingDirectory = "C:\\\\PSfile"; 
            psi.WorkingDirectory = "C:\\\\PSfile"; 
            psi.CreateNoWindow = true;
            psi.FileName = System.Environment.GetEnvironmentVariable("COMSPEC");
            psi.Arguments = $@"/C  psfile  \\fsb ""S:\Study_Info"" ";
            psi.UserName = _config.Value.username;      
            string plainString=_config.Value.password;
            SecureString secure = new SecureString();
            foreach (char c in plainString.ToCharArray())
            {
                secure.AppendChar(c);
            }
            psi.Password = secure;
            psi.Domain = _config.Value.domain;
                
                psi.UseShellExecute = false;
                psi.Verb = "runas";
                
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                psi.RedirectStandardOutput = true;
                
                process = Process.Start(psi);
              
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();

                exitCode = process.ExitCode;
                process.Close();
                Console.WriteLine("output>>" + (String.IsNullOrEmpty(output) ? "(none)" : output));
                Console.WriteLine("error>>" + (String.IsNullOrEmpty(error) ? "(none)" : error));
                Console.WriteLine("ExitCode: " + exitCode.ToString(), "ExecuteCommand"); 
    
            return   output;
     } 
     [HttpGet("{*filename}")] 
        public  async Task<ActionResult<string>> CloseSFFile(string filename)
        {   
               string Path=filename.Replace("/","\\");
     try
            {
                

               int exitCode;
                ProcessStartInfo psi = new ProcessStartInfo();
                Process process;
                psi.WorkingDirectory = "C:\\\\PSfile";
                psi.CreateNoWindow = true;
                psi.FileName = System.Environment.GetEnvironmentVariable("COMSPEC");
                psi.Arguments = $@"/C psfile \\fsb ""{Path}"" -c";
                psi.UserName =_config.Value.username;      
                string plainString=_config.Value.password;
                SecureString secure = new SecureString();
                foreach (char c in plainString.ToCharArray())
                {
                  secure.AppendChar(c);
                }
            psi.Password = secure;
            psi.Domain =_config.Value.domain;
            psi.Verb = "runas";
                psi.UseShellExecute = false;
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                psi.RedirectStandardOutput = true;
                process = Process.Start(psi);
                process.WaitForExit();

                // *** Read the streams ***
                // Warning: This approach can lead to deadlocks, see Edit #2
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();

                exitCode = process.ExitCode;
                process.Close();
              
                
            } 
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            } 
       
         return Path;
        }
    }
}