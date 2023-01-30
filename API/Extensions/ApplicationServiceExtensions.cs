
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;
namespace API.Extensions
{ 
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config) 
        { 
            services.AddScoped<ITokenService, TokenService>();
          //  services.AddDbContext<DataContext>(options => 
           // { 
              //options.UseSqlite(config.GetConnectionString("DefaultConnections")); 
             // options.UseNpgsql(config.GetConnectionString("DefaultConnections"));
            //} 
            //);    
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddCors();
             
            services.AddScoped<IStudyFolder,StudyFolder>(); 
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));  
            services.Configure<ITRSettings>(config.GetSection("ITRSettings")); 
            services.AddScoped<IPhotoService,PhotoService>(); 
            services.AddScoped<LogUserActivity>(); 
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddSignalR(); 
            services.AddSingleton<PresenceTracker>();
            return services;
        }
    }
}