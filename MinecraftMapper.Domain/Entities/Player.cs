namespace MinecraftMapper.Domain.Entities
{
    public class Player : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Realm CurrentRealm { get; set; }
        public string ExternalId { get; set; }    
    }
}