

using System.Diagnostics;
using System.Security;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Helpers
{
    public class StudyFolder : IStudyFolder
    { 
       
        
        public StudyFolder() 
        { 
           

        }

        public async Task<ActionResult<string>> Run()
        {
             int exitCode;
            ProcessStartInfo psi = new ProcessStartInfo();
            Process process;
            psi.WorkingDirectory = "C:\\";
            psi.CreateNoWindow = true;
            psi.FileName = System.Environment.GetEnvironmentVariable("COMSPEC");
            psi.Arguments = "/C regedit /s pstools-eula.reg";
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
           
            psi.RedirectStandardError = true;
         
            process = Process.Start(psi);
            process.WaitForExit();
     
            // *** Read the streams ***
            // Warning: This approach can lead to deadlocks, see Edit #2
            string output ; 
            output= process.StandardOutput.ReadToEnd();
            string error = process.StandardError.ReadToEnd();

            exitCode = process.ExitCode;
            
           //Console.WriteLine("output>>" + (String.IsNullOrEmpty(output) ? "(none)" : output));
           // Console.WriteLine("error>>" + (String.IsNullOrEmpty(error) ? "(none)" : error));
           // Console.WriteLine("ExitCode: " + exitCode.ToString(), "ExecuteCommand");
            process.Close();  
    
            return   output;
        }
    }
}