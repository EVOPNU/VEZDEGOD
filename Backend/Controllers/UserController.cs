using Backend.CustomDbContext;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IOptions<AuthOptions> options;
        public UserController(IOptions<AuthOptions> options)
        {
            this.options = options;

        }

        [Route("Registration")]
        [HttpPost]
        public IActionResult Registration([FromBody] CustomUser model)
        {
            if (model != null)
            {
                using CustomUserDbContext db = new CustomUserDbContext();
                foreach (var l in db.customUser.ToList())
                {
                    if (l.emailAddress == model.emailAddress)
                    {
                        return BadRequest("AlredyExist");
                    }
                }


                var token = GenerateJWT(model);
                db.customUser.Add(new CustomUser { lastName = model.lastName, firstName = model.firstName, emailAddress = model.emailAddress });
                db.SaveChanges();
                return Ok(new { access_token = token });
            }
            else
            {
                return BadRequest("input == null");
            }
        }

        [Route("Login")]
        [HttpPost]
        public IActionResult Login([FromBody] CustomUser model)
        {
            var user = AuthenticateUser(model);

            if (user != null)
            {
                var token = GenerateJWT(user);
                return Ok(new { access_token = token });
  
            }
            return Unauthorized();

        }


        [Route("Update")]
        [HttpPut]
        public IActionResult Update([FromBody] CustomUser model)
        {

            using CustomUserDbContext db = new CustomUserDbContext();
            db.customUser.Update(model);
            db.SaveChanges();
            return Ok(model);
          
        }




        private CustomUser AuthenticateUser(CustomUser user)
        {
            using CustomUserDbContext db = new CustomUserDbContext();
            {
                foreach (var l in db.customUser.ToList())
                {
                    if (l.emailAddress == user.emailAddress && l.lastName == user.lastName)
                    {
                        return l;
                    }
                }

            }
            return null;
        }


        private string GenerateJWT(CustomUser user)
        {
            var authParams = options.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentinals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email,user.emailAddress),
                new Claim(JwtRegisteredClaimNames.Sub,user.id.ToString()),
            };
            var token = new JwtSecurityToken(authParams.Issure,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
                signingCredentials: credentinals);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }





    }
}
