using Microsoft.OpenApi.Models;
using API.Data; 
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using API.Entities;
using Microsoft.AspNetCore.SignalR;
using API.SignalR;
using API.Interfaces;
using Microsoft.Extensions.Options;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment  _env;
         
        public Startup(IConfiguration config,IWebHostEnvironment env)
        {
           _env = env;
            _config = config;
            
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {   
            services.AddApplicationServices(_config);
           
            services.AddControllers();   
            services.AddIdentityServices(_config);  
            var connString="";
            if (_env.IsDevelopment())  
            {
              services.AddDbContext<DataContext>(options => 
            { 
              //options.UseSqlite(config.GetConnectionString("DefaultConnections")); 
              options.UseNpgsql(_config.GetConnectionString("DefaultConnections"));
            } 
            );  
            }
          else 
           {
           // Use connection string provided at runtime by Heroku.
              var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        // Parse connection URL to connection string for Npgsql
              connUrl = connUrl.Replace("postgres://", string.Empty);
              var pgUserPass = connUrl.Split("@")[0];
              var pgHostPortDb = connUrl.Split("@")[1];
              var pgHostPort = pgHostPortDb.Split("/")[0];
              var pgDb = pgHostPortDb.Split("/")[1];
              var pgUser = pgUserPass.Split(":")[0];
              var pgPass = pgUserPass.Split(":")[1];
              var pgHost = pgHostPort.Split(":")[0];
              var pgPort = pgHostPort.Split(":")[1];

              connString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};"; 
              services.AddDbContext<DataContext>(options => 
            { 
              //options.UseSqlite(config.GetConnectionString("DefaultConnections")); 
              options.UseNpgsql(connString);
            } 
            ); 
           }
               
   
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            }); 
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }
          
               
                app.UseHttpsRedirection();
                app.UseMiddleware<ExceptionMiddleware>();
                app.UseRouting(); 
                app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod().AllowCredentials().WithOrigins(new string[] { "https://fileunlock.itr.itrlab.com","https://localhost:4200","https://accountsvr.itr.itrlab.com","https://app.itrlab.com/accountserver"}));  
                app.UseAuthentication();
                app.UseAuthorization(); 
                app.UseDefaultFiles(); 
                app.UseStaticFiles();

            using var scope=app.ApplicationServices.CreateScope();  
           
            var services=scope.ServiceProvider; 
          app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();  
                
                endpoints.MapHub<PresenceHub>("hubs/presence"); 
                endpoints.MapHub<MessageHub>("hubs/message"); 
                endpoints.MapFallbackToController("index","Fallback");
                
            }); 
            
              try 
            { 
                var context=services.GetRequiredService<DataContext>(); 
                await context.Database.MigrateAsync(); 
                var userManager=services.GetRequiredService<UserManager<AppUser>>(); 
                var roleManager=services.GetRequiredService<RoleManager<AppRole>>(); 
               // await context.Database.ExecuteSqlRawAsync("DELETE FROM \"Connections\""); 
               // await Seed.ClearConnections(context);
               // await Seed.SeedUsers(userManager,roleManager); 
                
            } 
            catch (Exception ex) 
            { 
                var logger=services.GetService<ILogger<Program>>(); 
                logger.LogError(ex,"An error occired during migration");
            }
        }
    }
}
