using Microsoft.OpenApi.Models;
using API.Data; 
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using API.Entities;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
       
        public Startup(IConfiguration config)
        {
            _config = config;
           
            
        }

      

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {   
            services.AddApplicationServices(_config);
           
            services.AddControllers();   
            services.AddIdentityServices(_config);
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
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200")); 
            app.UseAuthentication();
            app.UseAuthorization();
            using var scope=app.ApplicationServices.CreateScope(); 
            var services=scope.ServiceProvider; 
          
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            }); 
              try 
            { 
                var context=services.GetRequiredService<DataContext>(); 
                await context.Database.MigrateAsync(); 
                var userManager=services.GetRequiredService<UserManager<AppUser>>(); 
                 var roleManager=services.GetRequiredService<RoleManager<AppRole>>();
                await Seed.SeedUsers(userManager,roleManager);
            } 
            catch (Exception ex) 
            { 
                var logger=services.GetService<ILogger<Program>>(); 
                logger.LogError(ex,"An error occired during migration");
            }
        }
    }
}
