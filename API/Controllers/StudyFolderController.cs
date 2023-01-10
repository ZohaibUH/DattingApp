
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Security;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;

namespace API.Controllers
{ 
  [Authorize]
    public class StudyFolderController :BaseApiController
    {
         private readonly IStudyFolder _studyFolder;
        public StudyFolderController(IStudyFolder studyFolder) 
        { 
           _studyFolder = studyFolder;  
           _studyFolder.Run();
           
           
        } 
     [HttpGet]
     public async Task< ActionResult<string>> GetOpenFiles()  
     {  
   int exitCode;
            ProcessStartInfo psi = new ProcessStartInfo();
            Process process;
            psi.WorkingDirectory = "C:\\\\PSfile";
            psi.CreateNoWindow = true;
            psi.FileName = System.Environment.GetEnvironmentVariable("COMSPEC");
            psi.Arguments = $@"/C  psfile  \\fsb ""S:\Study_Info"" ";
            psi.UserName = "dev";      
            string plainString="misITR17";
            SecureString secure = new SecureString();
            foreach (char c in plainString.ToCharArray())
            {
                secure.AppendChar(c);
            }
            psi.Password = secure;
            psi.Domain = "ITR";
           psi.Domain = "ITR";
                
                psi.UseShellExecute = false;
                psi.Verb = "runas";
                
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                psi.RedirectStandardOutput = true;
                
                process = Process.Start(psi);
               
               // process.WaitForExit();
               
                // *** Read the streams ***
                // Warning: This approach can lead to deadlocks, see Edit #2
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
                psi.UserName = "dev";      
                string plainString="misITR17";
                SecureString secure = new SecureString();
                foreach (char c in plainString.ToCharArray())
                {
                  secure.AppendChar(c);
                }
            psi.Password = secure;
            psi.Domain = "ITR";
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