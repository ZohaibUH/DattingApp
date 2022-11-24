using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errrors
{
    public class ApiException
    {
        public ApiException(int statusCode, string message, string details)
        {
            this.statusCode = statusCode;
            Message = message;
            Details = details;
        }

        public int statusCode  {get; set;} 
        public string Message  {get; set;} 
        public string Details  {get; set;}
    }
}