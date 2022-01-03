namespace MinecraftMapper.Requests
{
    public interface IHasThings
    {
        bool HasPortal { get; set; }
        bool HasEnderChest { get; set; }
        bool HasEnchantmentTable { get; set; }
        bool HasBed { get; set; }
        bool HasAnvil { get; set; }
        bool HasFurnace { get; set; }
    }
}