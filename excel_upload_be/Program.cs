var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var MyPolicies ="_myPolicies";
builder.Services.AddCors(options=>
{
    //var frontendURL = "http://localhost:3000";//configuration.GetValue<string>("FrontEndURL");
    // options.AddPolicy(name: MyPolicies, policy =>
    // {
    //     policy.WithOrigins("http://localhost:3000")
    //         .AllowAnyHeader().
    //         AllowAnyMethod();
    // });
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
    }

    );
}

);
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseCors(MyPolicies);
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
