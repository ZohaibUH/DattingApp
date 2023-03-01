
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
    public class ProcessController: BaseApiController
    { 
          private readonly IStudyFolder _studyFolder;
           private readonly  IOptions<ITRSettings> _config;
        
        public ProcessController(IStudyFolder studyFolder,IOptions<ITRSettings> config)
        { 
            _config = config;
            _studyFolder = studyFolder;  
           _studyFolder.Run();
           
        }  
        [HttpGet]
        public async Task<ActionResult<string>> GetFileProcess() 
        {     

         
           int exitCode; 
        try{
            
            ProcessStartInfo psi = new ProcessStartInfo();
            Process process;
    //        psi.WorkingDirectory = "C:\\\\PSfile"; 
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
            psi.Domain ="ITR";
                
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
             // Create the file.  
        } 
        catch(Exception ex) 
        { 
            string path=@"C:\Test\test.txt";
            using (var tw = new StreamWriter(path, true))
                {
                     tw.WriteLine(ex.Message);
                } 
            return ex.Message;
        }/*
             try{ 
            string output; 
            string path=@"C:\SOP-bat\log.txt";
            using (StreamReader streamReader = new StreamReader(path))
            {
                output = streamReader.ReadToEnd();
            }
            return  output; 
            } 
            catch(Exception ex) 
            {  

              return NoContent();
            }*/
           
        } 
     [HttpGet("{*filename}")] 
        public  async Task<ActionResult<string>> ExecuteBatchFile(string filename)
        {   string name=filename.Replace("/","\\"); 
            
            string directory=null;
         try
            {
                var destinationurl = "https://www.bing.com/";
            var sInfo = new System.Diagnostics.ProcessStartInfo(destinationurl)
            {
                UseShellExecute = true,
          

            }; 

            System.Diagnostics.Process.Start(sInfo);
                
               int exitCode;
                ProcessStartInfo psi = new ProcessStartInfo();
                Process process;
                psi.WorkingDirectory = @"C:\\\\PSfile"; 
                directory=psi.WorkingDirectory;
                psi.CreateNoWindow = true;
                psi.FileName = System.Environment.GetEnvironmentVariable("COMSPEC");
                psi.Arguments = $@"/C psfile \\fsb ""{name}"" -c";
                psi.UserName = _config.Value.username;      
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
               // Console.WriteLine("output>>" + (String.IsNullOrEmpty(output) ? "(none)" : output));
                //Console.WriteLine("error>>" + (String.IsNullOrEmpty(error) ? "(none)" : error));
                //Console.WriteLine("ExitCode: " + exitCode.ToString(), "ExecuteCommand"); 
                
            } 
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            } 
       
         return directory; 
         /*   try 
            { 
             string path=@"C:\SOP-bat\SOP-filename.txt";
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
            */
        }
    }
}