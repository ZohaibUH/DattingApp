using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IStudyFolder
    {
        Task<ActionResult<string>> Run();
    } 
    
}